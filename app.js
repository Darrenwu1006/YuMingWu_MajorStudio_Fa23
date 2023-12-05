//Sankey diagram
var margin = { top: 30, right: 30, bottom: 30, left: 30 },
  width = 800 - margin.left - margin.right,
  height = 1080 - margin.top - margin.bottom;

var formatNumber = d3.format(',.0f'), // zero decimal places
  format = function (d) {
    return formatNumber(d);
  },
  color = d3.scaleOrdinal(d3.schemeSet2);

var sankeysSvg = d3
  .select('#sankey_container')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

var sankey = d3.sankey().nodeWidth(36).nodePadding(12).size([width, height]);

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

// d3.csv('Data/top3_data_all.csv').then(function (data) {
//   sankeydata = { nodes: [], links: [] };

//   data.forEach(function (d) {
//     sankeydata.nodes.push({ name: d.source });
//     sankeydata.nodes.push({ name: d.target });
//     sankeydata.links.push({
//       source: d.source,
//       target: d.target,
//       value: +d.value,
//     });
//   });

//   // return only the distinct / unique nodes
//   sankeydata.nodes = Array.from(
//     d3.group(sankeydata.nodes, (d) => d.name),
//     ([value]) => value
//   );

//   // sankeydata.nodes.sort(ascendingSourceBreadth);

//   // loop through each link replacing the text with its index from node
//   sankeydata.links.forEach(function (d, i) {
//     sankeydata.links[i].source = sankeydata.nodes.indexOf(
//       sankeydata.links[i].source
//     );
//     sankeydata.links[i].target = sankeydata.nodes.indexOf(
//       sankeydata.links[i].target
//     );
//   });

//   sankeydata.nodes.forEach(function (d, i) {
//     sankeydata.nodes[i] = { name: d };
//   });

//   graph = sankey(sankeydata);

//   // add in the links
//   var link = svg
//     .append('g')
//     .selectAll('.link')
//     .data(graph.links)
//     .enter()
//     .append('path')
//     .attr('class', 'link')
//     .attr('d', d3.sankeyLinkHorizontal())
//     .attr('stroke-width', function (d) {
//       return d.width;
//     })
//     .on('click', (e) => {
//       const medium = e.target['__data__'].source.name;
//       const year = +e.target['__data__'].target.name;
//       const col = yearPosition[year].col;
//       const row = yearPosition[year].row;
//       console.log(medium, year);
//       d3.selectAll('.rect').remove();
//       drawCircle(row, col, numCols, false, '');
//     });

//   // add the link titles
//   link.append('title').text(function (d) {
//     return d.source.name + ' → ' + d.target.name + '\n' + format(d.value);
//   });

//   // add in the nodes
//   var node = svg
//     .append('g')
//     .selectAll('.node')
//     .data(graph.nodes)
//     .enter()
//     .append('g')
//     .attr('class', 'node')
//     .on('click', (d) => console.log(d));

//   // add the rectangles for the nodes
//   node
//     .append('rect')
//     .attr('x', function (d) {
//       return d.x0;
//     })
//     .attr('y', function (d) {
//       return d.y0;
//     })
//     .attr('height', function (d) {
//       return d.y1 - d.y0;
//     })
//     .attr('width', sankey.nodeWidth())
//     .style('fill', function (d) {
//       return (d.color = color(d.name.replace(/ .*/, '')));
//     })
//     .append('title')
//     .text(function (d) {
//       return d.name + '\n' + format(d.value);
//     });

//   // add in the title for the nodes
//   node
//     .append('text')
//     .attr('x', function (d) {
//       return d.x0 - 6;
//     })
//     .attr('y', function (d) {
//       return (d.y1 + d.y0) / 2;
//     })
//     .attr('dy', '0.35em')
//     .attr('text-anchor', 'end')
//     .text(function (d) {
//       return d.name;
//     })
//     .filter(function (d) {
//       return d.x0 < width / 2;
//     })
//     .attr('x', function (d) {
//       return d.x1 + 6;
//     })
//     .attr('text-anchor', 'start');
// });

//shutter chart
const csvFiles = [
  'Data/1840-1860.csv',
  'Data/1860-1880.csv',
  'Data/1880-1900.csv',
  'Data/1900-1920.csv',
  'Data/1920-1940.csv',
  'Data/1940-1960.csv',
  'Data/1960-1980.csv',
  'Data/1980-2000.csv',
  'Data/2000-2020.csv',
  'Data/top3_data_all.csv',
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
  console.log(graph.nodes);

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
      return d.width;
    })
    .on('click', (e) => {
      const medium = e.target['__data__'].source.name;
      const year = +e.target['__data__'].target.name;
      const col = yearPosition[year].col;
      const row = yearPosition[year].row;
      // console.log(col, row);
      // console.log(medium, year);
      d3.selectAll('.rect').remove();
      drawCircle(row, col, numCols, true, medium);
      updateAnimation(e);
    });

  // add the link titles
  link.append('title').text(function (d) {
    return d.source.name + ' → ' + d.target.name + '\n' + format(d.value);
  });

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
    .attr('id', (d) => d.name)
    .attr('x', function (d) {
      return d.x0;
    })
    .attr('y', function (d) {
      return d.y0;
    })
    .attr('height', function (d) {
      return d.y1 - d.y0;
    })
    .attr('width', sankey.nodeWidth())
    .style('fill', function (d) {
      return (d.color = color(d.name.replace(/ .*/, '')));
    })
    .on('click', (e) => {
      console.log(e.target.id);
      console.log(e);
      if (
        e.target.id.includes('9') ||
        e.target.id === '2000' ||
        e.target.id.includes('8')
      ) {
        const year = e.target.id;
        const col = yearPosition[year].col;
        const row = yearPosition[year].row;
        console.log(yearPosition);
        // console.log(col, row);
        d3.selectAll('.rect').remove();
        drawCircle(row, col, numCols, false, '');
      } else {
        const medium = e.target.id;
        console.log(medium);
        console.log(e);
        d3.selectAll('.rect').remove();
        for (let col = 0; col < numCols; col++) {
          for (let row = 0; row < numRows; row++) {
            drawCircle(row, col, numCols, true, medium);
          }
        }
      }
    })
    .append('title')
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

  const numRows = 3;
  const numCols = 3;
  const circleRadius = 120;
  const rotationAngle = 60;
  const circleDistanceX = 1350 / (numCols + 2);
  const circleDistanceY = 800 / numRows;
  const svg = d3
    .select('#shutter_container')
    .append('svg')
    .attr('width', 1400)
    .attr('height', 1080);

  async function drawCircle(row, col, numCols, filterd, value) {
    svg.selectAll('clipPath').remove();
    svg.selectAll('.rect').remove();
    let data;
    let numRectangles;
    if (filterd) {
      data = dataArray[row * numCols + col]
        .filter((d) => d.medium === value)
        .filter((d, i) => i < 60);
      numRectangles = data.length;
      console.log(data);
    } else {
      data = dataArray[row * numCols + col].filter((d, i) => i < 60);
      console.log(data);
      numRectangles = data.length;
    }

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
      .attr('stroke', 'none')
      .style('stroke-width', 0.1);

    let circleX = (col + 1) * circleDistanceX;
    let circleY = (row + 1) * circleDistanceY;
    let rectWidth = 150;
    let rectHeight = 300;

    let group = svg
      .append('g')
      .attr('class', 1820 + 20 * (row * numCols + col))
      .attr('clip-path', 'url(#clipPath' + (row * numCols + col) + ')');

    group
      .append('circle')
      .attr('cx', circleX)
      .attr('cy', circleY)
      .attr('r', circleRadius)
      .attr('stroke', 'gray')
      .attr('opacity', 0.2)
      .style('stroke-width', 0.1)
      .attr('fill', 'transparent');

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
      .style('opacity', (d, i) => 0.5 - 0.0029 * i)
      .style('stroke', '#CED0CE')
      .style('stroke-width', 1)
      .attr('transform', (d, i) => {
        let angle = ((i * angleStep + rotationAngle) * Math.PI) / 60;
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
      .transition()
      .duration(1500)

      // .attr('height', rectHeight - 120)
      // .attr('width', rectWidth - 80)
      .attr('transform', (d, i) => {
        let angle = ((i * angleStep + rotationAngle) * Math.PI) / 60;
        let rectRotationX = circleX + (circleRadius - 250) * Math.cos(angle);
        let rectRotationY = circleY + (circleRadius - 250) * Math.sin(angle);
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
      .duration(1500)
      .attr('transform', (d, i) => {
        let angle = ((i * angleStep + rotationAngle) * Math.PI) / 30;
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
      });

    // .on('click', function (e, d, i) {
    //   const target = e.target;
    //   // updateAnimation(e, d, i);
    // })
    // .on('mouseover', function (e, d, i) {
    //   const target = e.target;
    //   const marginAmount = -10;
    //   const hoverMenu = document.querySelector('.hover-menu');
    //   const rect = target.getBoundingClientRect();
    //   hoverMenu.style.left = rect.left + 'px';
    //   hoverMenu.style.top = rect.top - 10 + 'px';
    //   const image = hoverMenu.querySelector('img');
    //   const title = hoverMenu.querySelector('p');
    //   const medium = hoverMenu.querySelector('b');
    //   const objectid = hoverMenu.querySelector('a');

    //   image.src = d.url;
    //   title.textContent = d.title;
    //   medium.textContent = d.medium;
    //   objectid.textContent = d.id;

    //   hoverMenu.style.display = 'block';
    // })

    // .on('mouseout', function () {
    //   const hoverMenu = document.querySelector('.hover-menu');
    //   hoverMenu.style.display = 'none';
    //   target.style.margin = '0';
    // });

    // group
    //   .append('text')
    //   .text(1840 + (row * numCols + col) * 20)
    //   .attr('x', circleX)
    //   .attr('y', circleY)
    //   .style('font-size', '24px')
    //   .style('fill', 'black')
    //   .style('text-anchor', 'middle')
    //   .style('dominant-baseline', 'middle');
  }
  var animationDuration = [
    10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000,
  ];
  // var delayBetweenCircles = 500;
  
  for (let col = 0; col < numCols; col++) {
    for (let row = 0; row < numRows; row++) {
        drawCircle(row, col, numCols, false, '')
    }
  }
});

// function updateAnimation(timestamp) {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   for (var col = 0; col < numCols; col++) {
//     for (var row = 0; row < numRows; row++) {
//       var index = row * numCols + col;

//       // Calculate the animation progress (0 to 1)
//       var progress = animationProgress[index];
//       if (progress < 1) {
//         progress += timestamp / animationDuration;
//         if (progress >= 1) {
//           progress = 1;
//         }
//         animationProgress[index] = progress;
//       }

//       // Calculate the updated width and rotation of the rectangles
//       var rectWidth;
//       if (progress <= 0.5) {
//         rectWidth = 120 + progress * 180; // Width varies
//       } else {
//         rectWidth = 100 - (progress - 0.5) * 10; // Width decreases
//       }
//       var rotationAngleDegrees = 30 * progress; // Rotate by up to 30 degrees

//       // Calculate the center coordinates of the circle
//       var circleX = (col + 1) * circleDistanceX;
//       var circleY = (row + 1) * circleDistanceY;

//       // Draw the circle
//       ctx.beginPath();
//       ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
//       ctx.stroke();

//       // Draw the rectangles
//       for (var i = 0; i < numRectangles; i++) {
//         var angle =
//           ((i * angleStep + rotationAngle + rotationAngleDegrees) * Math.PI) /
//           180;
//         var rectX = circleX + circleRadius * Math.cos(angle);
//         var rectY = circleY + circleRadius * Math.sin(angle);
//         //draw stroke of every rectangles

//         ctx.save();

//         // Create a clipping path for the current circle
//         ctx.beginPath();
//         ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
//         ctx.clip();

//         // Draw the rectangles
//         var rectHeight = 300; // Fixed height

//         var rectRotationX = rectX;
//         var rectRotationY = rectY;

//         ctx.translate(rectRotationX, rectRotationY);
//         ctx.rotate(angle);

//         ctx.globalAlpha = opacity;
//         ctx.fillRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);

//         // Fill the rectangle with a gray color
//         ctx.fillStyle = 'black';
//         ctx.fillRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);

//         ctx.strokeStyle = 'darkgray';
//         ctx.lineWidth = 3; // Border width
//         ctx.strokeRect(-rectWidth / 2, -rectHeight / 2, rectWidth, rectHeight);

//         ctx.restore();
//       }
//     }
//   }

//   // Request the next frame
//   requestAnimationFrame(updateAnimation);
// }

// requestAnimationFrame(updateAnimation);
