"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

//Sankey diagram
var margin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
},
    width = 800 - margin.left - margin.right,
    height = 1080 - margin.top - margin.bottom;

var formatNumber = d3.format(',.0f'),
    // zero decimal places
format = function format(d) {
  return formatNumber(d);
},
    color = d3.scaleOrdinal(d3.schemeSet2);

var sankeysSvg = d3.select('#sankey_container').append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
var sankey = d3.sankey().nodeWidth(36).nodePadding(12).size([width, height]);
var path = sankey.links();
var yearPosition = {
  1840: {
    col: 0,
    row: 0
  },
  1860: {
    col: 1,
    row: 0
  },
  1880: {
    col: 2,
    row: 0
  },
  1900: {
    col: 0,
    row: 1
  },
  1920: {
    col: 1,
    row: 1
  },
  1940: {
    col: 2,
    row: 1
  },
  1960: {
    col: 0,
    row: 2
  },
  1980: {
    col: 1,
    row: 2
  },
  2000: {
    col: 2,
    row: 2
  }
}; // d3.csv('Data/top3_data_all.csv').then(function (data) {
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

var csvFiles = ['Data/1840-1860.csv', 'Data/1860-1880.csv', 'Data/1880-1900.csv', 'Data/1900-1920.csv', 'Data/1920-1940.csv', 'Data/1940-1960.csv', 'Data/1960-1980.csv', 'Data/1980-2000.csv', 'Data/2000-2020.csv', 'Data/top3_data_all.csv'];
var CSVCompiler = csvFiles.reduce(function (CSVCompiler, csv, i) {
  CSVCompiler.push(d3.csv(csv));
  return CSVCompiler;
}, []);
Promise.all(CSVCompiler).then(function _callee(dataArray) {
  var data, link, node, numRows, numCols, circleRadius, rotationAngle, circleDistanceX, circleDistanceY, svg, drawCircle, animationDuration, col, row;
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          drawCircle = function _ref3(row, col, numCols, filterd, value) {
            var data, numRectangles, newData, colorGenerator, i, angleStep, circleX, circleY, rectWidth, rectHeight, group;
            return regeneratorRuntime.async(function drawCircle$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    svg.selectAll('clipPath').remove();
                    svg.selectAll('.rect').remove();

                    if (filterd) {
                      data = dataArray[row * numCols + col].filter(function (d) {
                        return d.medium === value;
                      }).filter(function (d, i) {
                        return i < 60;
                      });
                      numRectangles = data.length;
                      console.log(data);
                    } else {
                      data = dataArray[row * numCols + col].filter(function (d, i) {
                        return i < 60;
                      });
                      console.log(data);
                      numRectangles = data.length;
                    }

                    newData = [];

                    colorGenerator = function colorGenerator(pic) {
                      var palette, paletteArray, swatch;
                      return regeneratorRuntime.async(function colorGenerator$(_context) {
                        while (1) {
                          switch (_context.prev = _context.next) {
                            case 0:
                              _context.next = 2;
                              return regeneratorRuntime.awrap(Vibrant.from(pic).getPalette());

                            case 2:
                              palette = _context.sent;
                              paletteArray = [];

                              for (swatch in palette) {
                                !palette[swatch] ? paletteArray.push('#000') : paletteArray.push(palette[swatch].getHex());
                              }

                              return _context.abrupt("return", paletteArray);

                            case 6:
                            case "end":
                              return _context.stop();
                          }
                        }
                      });
                    };

                    if (!(numRectangles !== 0)) {
                      _context2.next = 21;
                      break;
                    }

                    i = 0;

                  case 7:
                    if (!(i < numRectangles)) {
                      _context2.next = 21;
                      break;
                    }

                    _context2.t0 = newData;
                    _context2.t1 = data[i]['objectid'];
                    _context2.t2 = data[i]['iiifthumburl'];
                    _context2.next = 13;
                    return regeneratorRuntime.awrap(colorGenerator(data[i]['iiifthumburl']));

                  case 13:
                    _context2.t3 = _context2.sent;
                    _context2.t4 = data[i]['title'];
                    _context2.t5 = data[i]['medium'];
                    _context2.t6 = {
                      id: _context2.t1,
                      url: _context2.t2,
                      paletteList: _context2.t3,
                      value: 1,
                      title: _context2.t4,
                      medium: _context2.t5
                    };

                    _context2.t0.push.call(_context2.t0, _context2.t6);

                  case 18:
                    i++;
                    _context2.next = 7;
                    break;

                  case 21:
                    angleStep = numRectangles === 0 ? 0 : 360 / numRectangles;
                    svg.selectAll('clipPath').data(d3.range(numCols * numRows)).enter().append('clipPath').attr('id', function (d, i) {
                      return 'clipPath' + i;
                    }).append('circle').attr('cx', function (d, i) {
                      return (i % numCols + 1) * circleDistanceX;
                    }).attr('cy', function (d, i) {
                      return (Math.floor(i / numCols) + 1) * circleDistanceY;
                    }).attr('r', circleRadius).attr('stroke', 'none').style('stroke-width', 0.1);
                    circleX = (col + 1) * circleDistanceX;
                    circleY = (row + 1) * circleDistanceY;
                    rectWidth = 150;
                    rectHeight = 300;
                    group = svg.append('g').attr('class', 1820 + 20 * (row * numCols + col)).attr('clip-path', 'url(#clipPath' + (row * numCols + col) + ')');
                    group.append('circle').attr('cx', circleX).attr('cy', circleY).attr('r', circleRadius).attr('stroke', 'gray').attr('opacity', 0.2).style('stroke-width', 0.1).attr('fill', 'transparent');
                    group.append('g').selectAll('rects').data(newData).enter().append('rect').attr('class', 'rect').attr('id', function (d) {
                      return d.title;
                    }).attr('x', -rectWidth / 2).attr('y', -rectHeight / 2).attr('width', rectWidth).attr('height', rectHeight).style('fill', function (d, i) {
                      return "".concat(newData[i].paletteList[1]);
                    }).style('opacity', function (d, i) {
                      return 0.5 - 0.0029 * i;
                    }).style('stroke', '#CED0CE').style('stroke-width', 1).attr('transform', function (d, i) {
                      var angle = (i * angleStep + rotationAngle) * Math.PI / 60;
                      var rectRotationX = circleX + circleRadius * Math.cos(angle);
                      var rectRotationY = circleY + circleRadius * Math.sin(angle);
                      return 'translate(' + rectRotationX + ',' + rectRotationY + ') rotate(' + angle * 180 / Math.PI + ')';
                    }).transition().duration(1500) // .attr('height', rectHeight - 120)
                    // .attr('width', rectWidth - 80)
                    .attr('transform', function (d, i) {
                      var angle = (i * angleStep + rotationAngle) * Math.PI / 60;
                      var rectRotationX = circleX + (circleRadius - 250) * Math.cos(angle);
                      var rectRotationY = circleY + (circleRadius - 250) * Math.sin(angle);
                      return 'translate(' + rectRotationX + ',' + rectRotationY + ') rotate(' + angle * 180 / Math.PI + ')';
                    }).transition().duration(1500).attr('transform', function (d, i) {
                      var angle = (i * angleStep + rotationAngle) * Math.PI / 30;
                      var rectRotationX = circleX + circleRadius * Math.cos(angle);
                      var rectRotationY = circleY + circleRadius * Math.sin(angle);
                      return 'translate(' + rectRotationX + ',' + rectRotationY + ') rotate(' + angle * 180 / Math.PI + ')';
                    }); // .on('click', function (e, d, i) {
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

                  case 30:
                  case "end":
                    return _context2.stop();
                }
              }
            });
          };

          data = dataArray[dataArray.length - 1];
          sankeydata = {
            nodes: [],
            links: []
          };
          data.forEach(function (d) {
            sankeydata.nodes.push({
              name: d.source
            });
            sankeydata.nodes.push({
              name: d.target
            });
            sankeydata.links.push({
              source: d.source,
              target: d.target,
              value: +d.value
            });
          }); // return only the distinct / unique nodes

          sankeydata.nodes = Array.from(d3.group(sankeydata.nodes, function (d) {
            return d.name;
          }), function (_ref) {
            var _ref2 = _slicedToArray(_ref, 1),
                value = _ref2[0];

            return value;
          }); // sankeydata.nodes.sort(ascendingSourceBreadth);
          // loop through each link replacing the text with its index from node

          sankeydata.links.forEach(function (d, i) {
            sankeydata.links[i].source = sankeydata.nodes.indexOf(sankeydata.links[i].source);
            sankeydata.links[i].target = sankeydata.nodes.indexOf(sankeydata.links[i].target);
          });
          sankeydata.nodes.forEach(function (d, i) {
            sankeydata.nodes[i] = {
              name: d
            };
          });
          graph = sankey(sankeydata);
          console.log(graph.nodes); // add in the links

          link = sankeysSvg.append('g').selectAll('.link').data(graph.links).enter().append('path').attr('class', 'link').attr('d', d3.sankeyLinkHorizontal()).attr('stroke-width', function (d) {
            return d.width;
          }).on('click', function (e) {
            var medium = e.target['__data__'].source.name;
            var year = +e.target['__data__'].target.name;
            var col = yearPosition[year].col;
            var row = yearPosition[year].row; // console.log(col, row);
            // console.log(medium, year);

            d3.selectAll('.rect').remove();
            drawCircle(row, col, numCols, true, medium);
            updateAnimation(e);
          }); // add the link titles

          link.append('title').text(function (d) {
            return d.source.name + ' → ' + d.target.name + '\n' + format(d.value);
          }); // add in sankeysSvg

          node = sankeysSvg.append('g').selectAll('.node').data(graph.nodes).enter().append('g').attr('class', 'node'); // add the rectangles for the nodes

          node.append('rect').attr('id', function (d) {
            return d.name;
          }).attr('x', function (d) {
            return d.x0;
          }).attr('y', function (d) {
            return d.y0;
          }).attr('height', function (d) {
            return d.y1 - d.y0;
          }).attr('width', sankey.nodeWidth()).style('fill', function (d) {
            return d.color = color(d.name.replace(/ .*/, ''));
          }).on('click', function (e) {
            console.log(e.target.id);
            console.log(e);

            if (e.target.id.includes('9') || e.target.id === '2000' || e.target.id.includes('8')) {
              var year = e.target.id;
              var col = yearPosition[year].col;
              var row = yearPosition[year].row;
              console.log(yearPosition); // console.log(col, row);

              d3.selectAll('.rect').remove();
              drawCircle(row, col, numCols, false, '');
            } else {
              var medium = e.target.id;
              console.log(medium);
              console.log(e);
              d3.selectAll('.rect').remove();

              for (var _col = 0; _col < numCols; _col++) {
                for (var _row = 0; _row < numRows; _row++) {
                  drawCircle(_row, _col, numCols, true, medium);
                }
              }
            }
          }).append('title').text(function (d) {
            return d.name + '\n' + format(d.value);
          }); // add in the title for the nodes

          node.append('text').attr('x', function (d) {
            return d.x0 - 6;
          }).attr('y', function (d) {
            return (d.y1 + d.y0) / 2;
          }).attr('dy', '0.35em').attr('text-anchor', 'end').text(function (d) {
            return d.name;
          }).filter(function (d) {
            return d.x0 < width / 2;
          }).attr('x', function (d) {
            return d.x1 + 6;
          }).attr('text-anchor', 'start');
          numRows = 3;
          numCols = 3;
          circleRadius = 120;
          rotationAngle = 60;
          circleDistanceX = 1350 / (numCols + 2);
          circleDistanceY = 800 / numRows;
          svg = d3.select('#shutter_container').append('svg').attr('width', 1400).attr('height', 1080);
          animationDuration = [10000, 15000, 20000, 25000, 30000, 35000, 40000, 45000, 50000]; // var delayBetweenCircles = 500;

          for (col = 0; col < numCols; col++) {
            for (row = 0; row < numRows; row++) {
              drawCircle(row, col, numCols, false, '');
            }
          }

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // function updateAnimation(timestamp) {
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