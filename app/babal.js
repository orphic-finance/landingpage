document.addEventListener("DOMContentLoaded", function () {
    let h = 500;
    let w = 800;

    let time = new Date().getTime();
    let num = 500;
    let interval = 2000; // 2 seconds interval

    let noise = new SimplexNoise();
    let seed = 50 + 100 * Math.random();
    let data = [{ time: new Date(time), value: seed }];

    let x = d3.time.scale().range([0, w - 40]);
    let y = d3.scale.linear().range([h - 40, 0]);

    let xAxis = d3.svg
        .axis()
        .scale(x)
        .orient("bottom")
        .tickPadding(10)
        .ticks(d3.time.seconds, 60); // adjust tick interval

    let yAxis = d3.svg
        .axis()
        .scale(y)
        .orient("left")
        .innerTickSize(-w + 40)
        .outerTickSize(0)
        .tickPadding(10);

    let line = d3.svg
        .line()
        .x((d) => x(d.time))
        .y((d) => y(d.value));

    let svg = d3
        .select("#chart-container")
        .append("svg")
        .attr({ width: w, height: h })
        .append("g")
        .attr("transform", "translate(30, 20)");

    let $xAxis = svg
        .append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${h - 80})`)
        .call(xAxis);

    let $yAxis = svg.append("g").attr("class", "y axis").call(yAxis);

    let $data = svg.append("path").attr("class", "line data");

    svg.append("text")
        .attr("transform", `translate(${w / 2}, -10)`)
        .attr("text-anchor", "middle")
        .attr("class", "title")
        .text(new Date().toLocaleString("en-GB", { timeZone: "GMT" }));

    svg.append("text")
        .attr("transform", `translate(${w / 2}, ${h - 10})`)
        .attr("text-anchor", "middle")
        .attr("class", "xlabel")
        .text("Time");

    function tick() {
        time += interval;
        let newValue = data[data.length - 1].value + noise.noise2D(seed, time / interval);
        newValue = Math.max(newValue, 0);
        data.push({ time: new Date(time), value: newValue });

        if (data.length > num) {
            data.shift();
        }
    }

    function update() {
        let now = new Date(time);
        x.domain([new Date(now.getTime() - num * interval), now]);
        let yDom = d3.extent(data, d => d.value);
        yDom[0] = Math.max(yDom[0] - 1, 0);
        yDom[1] += 1;
        y.domain(yDom);

        $xAxis.call(xAxis).selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-0.8em")
            .attr("dy", "0.15em")
            .attr("transform", "rotate(-45)");

        $yAxis.call(yAxis);
        $data.datum(data).attr("d", line);
        svg.select(".title").text(new Date().toLocaleString("en-GB", { timeZone: "GMT" }));

    }

    for (let i = 0; i < num + 50; i++) {
        tick();
    }

    update();

    setInterval(() => {
        tick();
        update();
    }, interval);
});
