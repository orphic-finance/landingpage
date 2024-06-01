import os
import json
import git
import csv
import toml
import subprocess
from collections import defaultdict

repo_path = os.path.dirname(os.path.abspath(__file__))
output_file = "repo_contents.txt"

authorized_extensions = [
    ".py", ".sh", ".txt", ".ipynb", ".toml", ".css", ".html", ".json", ".md"
]

# List of folders to ignore
ignore_folders = ["test", "out", "__pycache__", "node_modules", "dist", "build"]

# Dictionary to hold word counts by file extension
word_counts_by_type = defaultdict(int)

def write_header(output_file, repo_path):
    header = (
        "This file contains a structured export of the repository at "
        + repo_path
        + " intended to provide full context for a large language model.\n"
        + " I need you to understand in detail and pay a lot of attention to the code in this repository.\n"
        + "This is a large repository and the code in it is very complex.\n"
        + "Please read the code in this repository carefully and understand it well.\n"
        + " You will need to connect files between the different imports. \n"
        + "Make some global suggestions if you think some parts should be changed and can be improved.\n"
        + "Below is the project's structure followed by the content of its files.\n\n"
    )
    with open(output_file, "a", encoding="utf-8") as of:
        of.write(header)

def capture_tree_structure(repo_path, output_file):
    repo = git.Repo(repo_path)
    with open(output_file, "a", encoding="utf-8") as of:
        for item in repo.tree().traverse():
            if (
                item.type == "tree"
                and not repo.ignored(os.path.join(repo_path, item.path))
                and "__pycache__" not in item.path
            ):
                of.write(item.path + "\n")
                process = subprocess.Popen(
                    [
                        "tree",
                        "-L",
                        "2",
                        os.path.join(repo_path, item.path),
                        "-I",
                        "__pycache__",
                    ],
                    stdout=subprocess.PIPE,
                )
                out, _ = process.communicate()
                of.write(out.decode("utf-8") + "\n")

def write_file_contents(path, output_file):
    _, file_extension = os.path.splitext(path)
    if os.path.basename(path) == "context.py" or "__pycache__" in path:
        return  # Skip this file and any file in __pycache__

    contents = "Unsupported file type"  # Default content if no other case matches
    try:
        with open(path, "r", encoding="utf-8") as file:
            if file_extension in authorized_extensions:
                if file_extension in [".py", ".sh", ".txt", ".md", ".html", ".css"]:
                    contents = file.read()
                elif file_extension == ".ipynb":
                    notebook = json.load(file)
                    contents = "\n".join(
                        cell["source"]
                        for cell in notebook["cells"]
                        if cell["cell_type"] == "code"
                    )
                elif file_extension == ".csv":
                    reader = csv.reader(file)
                    contents = "\n".join(",".join(row) for row in reader)
                elif file_extension == ".toml":
                    toml_content = toml.load(file)
                    contents = json.dumps(toml_content, indent=2)
                elif file_extension == ".json":
                    json_content = json.load(file)
                    contents = json.dumps(json_content, indent=2)
                # Count words only if contents are properly loaded and transformed
                word_count = len(contents.split())
                word_counts_by_type[file_extension] += word_count
            # Ensure contents is a string
            if not isinstance(contents, str):
                contents = str(contents)
    except Exception as e:
        contents = f"Error reading file: {str(e)}"

    with open(output_file, "a", encoding="utf-8") as of:
        of.write(f"File: {path}\n")
        of.write(contents)
        of.write("\n\n")

def walk_repo(repo_path, output_file):
    repo = git.Repo(repo_path)
    tree = repo.tree()
    for blob in tree.traverse():
        if blob.type == "blob":
            file_path = os.path.join(repo_path, blob.path)
            if (
                not repo.ignored(file_path)
                and os.path.splitext(file_path)[1] in authorized_extensions
                and not any(ignore_folder in file_path for ignore_folder in ignore_folders)
            ):
                write_file_contents(file_path, output_file)

def analyze_content(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        contents = file.read()
        character_count = len(contents)
        word_count = len(contents.split())
        print(f"Total length of context: {character_count:,} characters")
        print(f"Total number of words: {word_count:,} words")

def print_word_counts_by_type():
    # Determine the maximum width of the file extension strings for formatting
    max_ext_len = max(len(ext) for ext in word_counts_by_type.keys())
    print("\nWord counts by file type:")
    print(f"{'File Type':<{max_ext_len}} | {'Word Count'}")
    print(
        "-" * (max_ext_len + 15)
    )  # Adjust the number 15 based on the length of the column titles
    for ext, count in sorted(word_counts_by_type.items()):
        # Align text left and numbers right, ensuring columns match up
        print(f"{ext:<{max_ext_len}} | {count:10,}")

if __name__ == "__main__":
    # Ensure the output file is empty before starting
    open(output_file, "w").close()
    write_header(output_file, repo_path)
    #capture_tree_structure(repo_path, output_file)
    walk_repo(repo_path, output_file)
    analyze_content(output_file)
    print_word_counts_by_type()
