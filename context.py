import os, json, csv, toml, logging
from collections import defaultdict

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

repo_path = os.path.dirname(os.path.abspath(__file__))
output_file = "repo_contents.txt"

authorized_extensions = [".py", ".sh", ".txt", ".ipynb", ".toml", ".css", ".html", ".json", ".md", ".go"]

ignore_folders = ["config", "test", "out", "__pycache__", "node_modules", "dist", "build"]

ignore_files = ["context.py", "repo_contents.txt", 'test.ipynb']  
 

word_counts_by_type = defaultdict(int)

def write_header(output_file, repo_path):
    """Write the header to the output file."""
    header = (
        "This file contains a comprehensive structured export of the repository located at "
        f"{repo_path}. This export is intended to provide full context for a large language model (LLM) to analyze the repository in detail.\n\n"
        "### Purpose\n"
        "The goal is to assist in understanding, analyzing, and potentially improving the complex and interconnected code within this repository.\n"
        "The repository's structure and the content of its files are included below to give a complete view of the project.\n\n"
        "### Instructions for the Language Model\n"
        "You are an expert in the code that I will provide you. You should not make any errors;\n"
        "this should be the best code you have ever produced. \n"
        "Your analysis and suggestions should ensure that I can achieve the highest level of performance and quality in my competition.\n"
        "You have a Ph.D. level of knowledge in computer science, and your recommendations should reflect that level of expertise.\n\n"
        "1. **Read Carefully:** Pay close attention to the code in this repository. The codebase is large and complex, requiring a detailed examination.\n"
        "2. **Understand Interconnections:** Many files are interdependent. You need to understand how different parts of the code connect and interact with each other.\n"
        "3. **Provide Feedback:** After understanding the code, please provide suggestions for improvements, optimizations, and refactoring opportunities. Focus on enhancing code readability, efficiency, and maintainability.\n"
        "4. **Error Resolution:** If there are errors or potential issues identified in the code, suggest solutions or corrections with clear explanations and code snippets where applicable.\n"
        "5. **Excellence in Output:** Your suggestions should be of the highest quality, ensuring that the codebase is robust, efficient, and follows best practices in software engineering.\n\n"
        "### Repository Structure\n"
        "The following sections outline the project's structure, followed by the content of its files, categorized by file type. Each file's path and content are included to give a full context for analysis.\n\n"
        "#### Authorized File Types\n"
        "This export includes files with the following extensions:\n"
        f"{', '.join(authorized_extensions)}\n\n"
        "#### Ignored Folders\n"
        "The following folders are ignored in this export to focus on the main codebase:\n"
        f"{', '.join(ignore_folders)}\n\n"
    )
    with open(output_file, "a", encoding="utf-8") as of:
        of.write(header)


def write_file_contents(path, output_file):
    """Write the contents of a file to the output file, handling various formats."""
    _, file_extension = os.path.splitext(path)
    if os.path.basename(path) in ignore_files or "__pycache__" in path:
        return  # Skip ignored files and any file in __pycache__

    contents = "Unsupported file type"  # Default content if no other case matches
    try:
        with open(path, "r", encoding="utf-8") as file:
            if file_extension in authorized_extensions:
                if file_extension in [".py", ".sh", ".txt", ".md", ".html", ".css", ".go"]:
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
        contents = f"Error reading file {path}: {str(e)}"
        logging.error(contents)

    with open(output_file, "a", encoding="utf-8") as of:
        of.write(f"File: {path}\n")
        of.write(contents)
        of.write("\n\n")

def walk_repo(repo_path, output_file):
    """Walk through the repository and process each file."""
    if os.path.exists(os.path.join(repo_path, '.git')):
        logging.info("Git repository detected.")
        try:
            repo = git.Repo(repo_path)
            tree = repo.tree()
            for blob in tree.traverse():
                if blob.type == "blob":
                    file_path = os.path.join(repo_path, blob.path)
                    if (
                        not repo.ignored(file_path)
                        and os.path.splitext(file_path)[1] in authorized_extensions
                        and not any(ignore_folder in file_path for ignore_folder in ignore_folders)
                        and os.path.basename(file_path) not in ignore_files
                    ):
                        write_file_contents(file_path, output_file)
        except Exception as e:
            logging.error(f"Error accessing Git repository: {e}")
            walk_repo_basic(repo_path, output_file)
    else:
        logging.info("No Git repository detected. Using basic file walk.")
        walk_repo_basic(repo_path, output_file)

def walk_repo_basic(repo_path, output_file):
    """Basic file walk for non-Git repositories."""
    for root, _, files in os.walk(repo_path):
        if any(ignore_folder in root for ignore_folder in ignore_folders):
            continue  # Skip ignored folders
        for file in files:
            file_path = os.path.join(root, file)
            if (
                os.path.splitext(file_path)[1] in authorized_extensions
                and os.path.basename(file_path) not in ignore_files
            ):
                write_file_contents(file_path, output_file)

def analyze_content(file_path):
    """Analyze the content of the output file."""
    with open(file_path, "r", encoding="utf-8") as file:
        contents = file.read()
        character_count = len(contents)
        word_count = len(contents.split())
        logging.info(f"Total length of context: {character_count:,} characters")
        logging.info(f"Total number of words: {word_count:,} words")

def print_word_counts_by_type():
    """Print word counts by file type."""
    max_ext_len = max(len(ext) for ext in word_counts_by_type.keys())
    logging.info("")
    logging.info("Word counts by file type:")
    logging.info(f"{'File Type':<{max_ext_len}} | {'Word Count'}")
    logging.info(
        "-" * (max_ext_len + 15)
    )  # Adjust the number 15 based on the length of the column titles
    for ext, count in sorted(word_counts_by_type.items()):
        logging.info(f"{ext:<{max_ext_len}} | {count:10,}")

if __name__ == "__main__":
    open(output_file, "w").close()
    write_header(output_file, repo_path)
    walk_repo(repo_path, output_file)
    analyze_content(output_file)
    print_word_counts_by_type()