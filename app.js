//Sankey diagram
(width = window.innerWidth), (height = window.innerHeight);
var margin = { top: 10, right: 0, bottom: 0, left: 3 },
  width = 600
  height = 1130

var formatNumber = d3.format(',.0f'), // zero decimal places
  format = function (d) {
    return formatNumber(d);
  };

// add designated color into range

const nodeColorScale = d3.scaleOrdinal(d3.schemeCategory10);

var sankeysSvg = d3
  .select('#sankey_container')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var sankey = d3.sankey().nodeWidth(15).nodePadding(30).size([width, height]);

var path = sankey.links();

const yearPosition = {
  1840: { col: 0, row: 0 },
  1860: { col: 1, row: 0 },
  1880: { col: 2, row: 0 },
  1900: { col: 0, row: 1 },
  1920: { col: 1, row: 1 },
  1940: { col: 2, row: 1 },
  1960: { col: 0, row: 2 },
  1980: { col: 1, row: 2 },
  2000: { col: 2, row: 2 },
};

//shutter chart
const csvFiles = [
  './data/1840-1860.csv',
  './data/1860-1880.csv',
  './data/1880-1900.csv',
  './data/1900-1920.csv',
  './data/1920-1940.csv',
  './data/1940-1960.csv',
  './data/1960-1980.csv',
  './data/1980-2000.csv',
  './data/2000-2020.csv',
  './data/top3_data_all.csv',
];

const CSVCompiler = csvFiles.reduce((CSVCompiler, csv, i) => {
  CSVCompiler.push(d3.csv(csv));
  return CSVCompiler;
}, []);

Promise.all(CSVCompiler).then(async function (dataArray) {
  const data = dataArray[dataArray.length - 1];

  sankeydata = { nodes: [], links: [] };

  data.forEach(function (d) {
    sankeydata.nodes.push({ name: d.source });
    sankeydata.nodes.push({ name: d.target });
    sankeydata.links.push({
      source: d.source,
      target: d.target,
      value: +d.value,
    });
    // console.log(d.source, d.target, d.value);
  });

  // return only the distinct / unique nodes
  sankeydata.nodes = Array.from(
    d3.group(sankeydata.nodes, (d) => d.name),
    ([value]) => value
  );

  // sankeydata.nodes.sort(ascendingSourceBreadth);

  // loop through each link replacing the text with its index from node
  sankeydata.links.forEach(function (d, i) {
    sankeydata.links[i].source = sankeydata.nodes.indexOf(
      sankeydata.links[i].source
    );
    sankeydata.links[i].target = sankeydata.nodes.indexOf(
      sankeydata.links[i].target
    );
  });

  sankeydata.nodes.forEach(function (d, i) {
    sankeydata.nodes[i] = { name: d };
  });

  graph = sankey(sankeydata);
  // console.log(graph.nodes);

  var defs = sankeysSvg.append('defs');
  var pattern = defs
    .append('pattern')
    .attr('width', 100) // Adjust the width and height as needed
    .attr('height', 100);

  // add in the links
  var link = sankeysSvg
    .append('g')
    .selectAll('.link')
    .data(graph.links)
    .enter()
    .append('path')
    .attr('class', 'link')
    .attr('d', d3.sankeyLinkHorizontal())
    .attr('stroke-width', function (d) {
      return d.width + 5;
    })
    .style('stroke', '#5e503f')
    .style('stroke-opacity', 0.2)
    .attr('fill', 'none')
    .on('click', (e) => {
      const clickedLink = d3.select(e.target);
      const strokeWidthReduction = 30;

      // Back to default opacity for all links
      d3.selectAll('.node .clickedNode').style('opacity', 0.5);
      d3.selectAll('.link').style('stroke-opacity', 0.2);

      clickedLink
        .transition()
        .duration(100)
        .attr('stroke-width', (d) => d.width - strokeWidthReduction)
        // .style('stroke', '#432818') // Set the color during the click
        .style('stroke-opacity', 1) // Preserve the opacity during the click
        .on('end', () => {
          clickedLink
            .transition()
            .duration(100)
            .attr('stroke-width', (d) => d.width + 5)
            // .style('stroke', '#432818')
            .style('stroke-opacity', 1);
        });
      const medium = e.target['__data__'].source.name;
      const year = +e.target['__data__'].target.name;
      const value = +e.target['__data__'].value;
      const col = yearPosition[year].col;
      const row = yearPosition[year].row;
      // console.log(col, row);
      // console.log(medium, year, value);
      d3.selectAll('.rect').remove();
      drawCircle(row, col, numCols, true, medium);

      //description of the link
      const mediumElement = d3.select('#description').select('span.medium');
      mediumElement.text(function (d) {
        return medium.toUpperCase();
      });
      const yearElement = d3.select('#description').select('span.year');
      yearElement.text(function (d) {
        return year + ' - ' + (year + 20);
      });
      const valueElement = d3.select('#description').select('span.value');
      valueElement.text(function (d) {
        return format(value);
      });
      // updateAnimation(e);
    });

  // add the link titles
  link
    .append('title')
    .text(function (d) {
      return d.source.name + ' → ' + d.target.name + '\n' + format(d.value);
      console.log(d.source.name, d.target.name, d.value);
    })
    .style('fill', 'none');

  // add in sankeysSvg
  var node = sankeysSvg
    .append('g')
    .selectAll('.node')
    .data(graph.nodes)

    .enter()
    .append('g')
    .attr('class', 'node');

  // add the rectangles for the nodes
  node
    .append('rect')
    .attr('class', 'clickedNode')
    .attr('id', (d) => d.name)
    .attr('x', function (d) {
      return d.x0;
    })
    .attr('y', function (d) {
      return d.y0 - 2.1;
    })
    .attr('height', function (d) {
      return d.y1 - d.y0 + 5;
    })
    .attr('width', sankey.nodeWidth())
    .style('fill', 'white')
    .style('opacity', 0.3)

    .on('click', (e) => {
      const clickedNode = d3.select(e.target);
      const shrinkScale = 0.02;
      const originalX = clickedNode.attr('x');
      const originalY = clickedNode.attr('y');

      const originalHeight = clickedNode.attr('height');
      const originalWidth = clickedNode.attr('width');
      d3.selectAll('.node .clickedNode').style('opacity', 0.3);
      d3.selectAll('.link').style('stroke-opacity', 0.2);

      clickedNode
        .transition()
        .duration(100)
        .attr('x', originalX)
        .attr('y', originalY)
        .attr('width', width * shrinkScale)
        .style('opacity', 1)

        .on('end', () => {
          clickedNode
            .transition()
            .duration(100)
            .attr('x', originalX)
            .attr('y', originalY)
            .attr('width', originalWidth)
            .style('opacity', 1);
        });

      const medium = e.target.id;
      const titleContent = d3.select(e.target).select('.description').text();
      console.log(titleContent);
      const parts = titleContent.split('\n');
      const titleValue = parts[parts.length - 1];
      console.log(medium + ',' + titleValue);

      const nodeValueElement = d3.select('#description').select('span.value');
      nodeValueElement.text(function (d) {
        return titleValue;
      });

      if (
        e.target.id.includes('9') ||
        e.target.id === '2000' ||
        e.target.id.includes('8')
      ) {
        const year = e.target.id;
        const col = yearPosition[year].col;
        const row = yearPosition[year].row;

        const nodeYearElement = d3.select('#description').select('span.year');
        nodeYearElement.text(function (d) {
          return parseInt(year) + ' - ' + (parseInt(year) + 20);
        });

        const nodeMediumElement = d3
          .select('#description')
          .select('span.medium');
        nodeMediumElement.text(function (d) {
          return 'Three Major Imaging Techniques';
        });
        d3.selectAll('.rect').remove();
        drawCircle(col, row, numCols, false, '');
      } else {
        const medium = e.target.id;
        d3.selectAll('.rect').remove();
        for (let col = 0; col < numCols; col++) {
          for (let row = 0; row < numRows; row++) {
            drawCircle(row, col, numCols, true, medium);
            const nodeMediumElement = d3
              .select('#description')
              .select('span.medium');
            nodeMediumElement.text(function (d) {
              return medium.toUpperCase();
            });

            const nodeYearElement = d3
              .select('#description')
              .select('span.year');
            nodeYearElement.text(function (d) {
              return 'Multiple Eras';
            });
          }
        }
      }
    })
    .append('title')
    .classed('description', true)
    .text(function (d) {
      return d.name + '\n' + format(d.value);
    });

  // add in the title for the nodes
  node
    .append('text')
    .attr('x', function (d) {
      return d.x0 - 6;
    })
    .attr('y', function (d) {
      return (d.y1 + d.y0) / 2;
    })
    .attr('dy', '0.35em')
    .attr('text-anchor', 'end')
    .style('fill', 'white')
    .style('font-family', 'prestige-elite-std, monospace')
    .style('font-weight', '400')
    .style('font-style', 'normal')
    .style('text-transform', 'uppercase')
    .style('font-size', '16px')
    .text(function (d) {
      return d.name;
    })
    .filter(function (d) {
      return d.x0 < width / 2;
    })
    .attr('x', function (d) {
      return d.x1 + 6;
    })
    .attr('text-anchor', 'start');

  //shutter chart
  const numRows = 3;
  const numCols = 3;
  const circleRadius = 120;
  const rotationAngle = 0;
  const circleDistanceX = 1400 / (numCols + 2);
  const circleDistanceY = 1000 / numRows;
  const svg = d3
    .select('#shutter_container')
    .append('svg')
    .attr('width', '100vw')
    .attr('height', '100vh')
    .style('position', 'absolute')
    .style('top', '-12%')
    .style('left', '15%')
    // .style('transform', 'translate(-50%, -50%)')
    .style('cursor', 'pointer');

  async function drawCircle(row, col, numCols, filtered, value) {
    // svg.selectAll('clipPath').remove();
    // svg.selectAll('.rect').remove();
    let data;
    let numRectangles;
    if (filtered) {
      data = dataArray[row * numCols + col]
        .filter((d) => d.medium === value)
        .filter((d, i) => i < 180);
      numRectangles = data.length;
      // console.log(data);
    } else {
      data = dataArray[row * numCols + col].filter((d, i) => i < 180);
      // console.log(data);
      numRectangles = data.length;
    }
    // if (filtered) {
    //   data = dataArray[row * numCols + col]
    //     .filter((d) => d.medium === value)
    //     .sort(() => Math.random() - 0.5) // Shuffle the array randomly
    //     .slice(0, 180); // Take the first 180 elements
    //   numRectangles = data.length;
    // } else {
    //   data = dataArray[row * numCols + col]
    //     .sort(() => Math.random() - 0.5) // Shuffle the array randomly
    //     .slice(0, 180); // Take the first 180 elements
    //   numRectangles = data.length;
    // }

    const newData = [];
    const colorGenerator = async (pic) => {
      const palette = await Vibrant.from(pic).getPalette();
      const paletteArray = [];
      for (var swatch in palette) {
        !palette[swatch]
          ? paletteArray.push('#000')
          : paletteArray.push(palette[swatch].getHex());
      }
      return paletteArray;
    };

    if (numRectangles !== 0) {
      for (let i = 0; i < numRectangles; i++) {
        newData.push({
          id: data[i]['objectid'],
          url: data[i]['iiifthumburl'],
          paletteList: await colorGenerator(data[i]['iiifthumburl']),
          value: 1,
          title: data[i]['title'],
          medium: data[i]['medium'],
        });
        // console.log(newData);
      }
    }
    const angleStep = numRectangles === 0 ? 0 : 360 / numRectangles;

    svg
      .selectAll('clipPath')
      .data(d3.range(numCols * numRows))
      .enter()
      .append('clipPath')
      .attr('class', 'clipPath')
      .attr('id', function (d, i) {
        return 'clipPath' + i;
      })
      .append('circle')
      .attr('cx', function (d, i) {
        return ((i % numCols) + 1) * circleDistanceX;
      })
      .attr('cy', function (d, i) {
        return (Math.floor(i / numCols) + 1) * circleDistanceY;
      })
      .attr('r', circleRadius)
      .attr('stroke', 'white')
      .style('stroke-width', 100);

    let circleX = (col + 1) * circleDistanceX;
    let circleY = (row + 1) * circleDistanceY;
    let rectWidth = 200;
    let rectHeight = 250;

    let group = svg
      .append('g')
      .attr('class', 1820 + 20 * (row * numCols + col))
      .attr('clip-path', 'url(#clipPath' + (row * numCols + col) + ')');

    group
      .append('circle')
      .attr('class', 'circle')
      .attr('cx', circleX)
      .attr('cy', circleY)
      .attr('r', circleRadius)
      .attr('stroke', '#495057')
      .attr('opacity', 1)
      .style('stroke-width', 1)
      .attr('fill', 'transparent');

    group
      .append('text')
      .text(1840 + (row * numCols + col) * 20)
      .attr('x', circleX)
      .attr('y', circleY)
      .style('font-size', '16px')
      .style('fill', '#ebebeb')
      .style('text-anchor', 'middle')
      .style('dominant-baseline', 'middle')
      .style('font-family', 'halyard-text, sans-serif')
      .style('font-style', 'normal')
      .style('font-weight', '100')
      .style('pointer-events', 'none');

    group
      .append('g')
      .selectAll('rects')
      .data(newData)
      .enter()
      .append('rect')
      .attr('class', 'rect')
      .attr('id', (d) => d.title)
      .attr('x', -rectWidth / 2)
      .attr('y', -rectHeight / 2)
      .attr('width', rectWidth)
      .attr('height', rectHeight)
      .style('fill', (d, i) => `${newData[i].paletteList[1]}`)
      .style('opacity', (d, i) => 0.6 - 0.0029 * i)
      .style('stroke', '#ccc5b9')
      .style('stroke-width', 0.1)
      .attr('transform', (d, i) => {
        let angle = ((i * angleStep + rotationAngle) * Math.PI) / 180;
        let rectRotationX = circleX + circleRadius * Math.cos(angle);
        let rectRotationY = circleY + circleRadius * Math.sin(angle);
        return (
          'translate(' +
          rectRotationX +
          ',' +
          rectRotationY +
          ') rotate(' +
          (angle * 180) / Math.PI +
          ')'
        );
      })
      .on('click', function (e, d, i) {
        const target = e.target;
        const marginAmount = -10;
        const hoverMenu = document.querySelector('.hover-menu');
        const rect = target.getBoundingClientRect();

        const image = hoverMenu.querySelector('img');
        const title = hoverMenu.querySelector('p');
        const medium = hoverMenu.querySelector('b');
        const objectid = hoverMenu.querySelector('a');

        image.src = d.url;
        title.textContent = d.title;
        medium.textContent = d.medium;
        objectid.textContent = d.id;

        hoverMenu.style.display = 'block';
      })

      .transition()
      .duration(100)
      .attr('transform', (d, i) => {
        let angle = ((i * angleStep + rotationAngle) * Math.PI) / 30;
        let rectRotationX = circleX + (circleRadius - 25) * Math.cos(angle);
        let rectRotationY = circleY + (circleRadius - 25) * Math.sin(angle);
        return (
          'translate(' +
          rectRotationX +
          ',' +
          rectRotationY +
          ') rotate(' +
          (angle * 180) / Math.PI +
          ')'
        );
      })
      .transition()
      .duration(800)
      .attr('transform', (d, i) => {
        let angle = ((i * angleStep + rotationAngle) * Math.PI) / 30;
        let rectRotationX = circleX + (circleRadius + 25) * Math.cos(angle);
        let rectRotationY = circleY + (circleRadius + 25) * Math.sin(angle);
        return (
          'translate(' +
          rectRotationX +
          ',' +
          rectRotationY +
          ') rotate(' +
          (angle * 180) / Math.PI +
          ')'
        );
      });
  }
  var animationDuration = [
    1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000,
  ];
  function drawCirclesSequentially() {
    let currentDelay = 0;

    for (let col = 0; col < numCols; col++) {
      for (let row = 0; row < numRows; row++) {
        setTimeout(() => {
          drawCircle(col, row, numCols, false, '');
        }, currentDelay);
        currentDelay += animationDuration[col];
      }
    }
  }
  drawCirclesSequentially();
});
