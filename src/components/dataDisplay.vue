<template>
    <div id="app-data-display-id">
        <div id="canvas-id" class="canvas">
            <!-- D3 code is injected here -->
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatStateForD3 } from '../helpers/dataDisplay';
const d3 = require('d3');

const width = 1000;
const height = 450;
const margin = {'top': 20, 'right': 20, 'bottom': 10, 'left': 50};
const graphWidth = width - margin.left - margin.right;
const graphHeight = height - margin.top - margin.bottom;
let svg;
let graph;
let gXAxis;
let gYAxis;
let x, y; 
let tooltip;

export default {
    name: 'dataDisplay',
    computed:{
        ...mapGetters([
            'causesOfDeaths',
            'initialLoadError'
        ])
    },
    mounted(){
        svg = d3.select('.canvas')
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);

        graph = svg.append('g')
                        .attr('width', graphWidth)
                        .attr('height', graphHeight)
                        .attr('transform', `translate(${margin.left}, ${margin.top})`);

        gXAxis = graph.append('g')
                        .attr('transform', `translate(0, ${graphHeight})`);

        gYAxis = graph.append('g');

        tooltip = d3.select("body").append("div").attr("class", "toolTip");
    },
    watch: {
        causesOfDeaths: {
            handler: function(){
                console.log('changed');
                if(Object.keys(this.causesOfDeaths).length > 0){
                    if(d3.select('svg').attr('width') == 0){
                        d3.select('svg')
                            .attr('width', width)
                            .attr('height', height);
                        document.getElementById('canvas-id').style.backgroundColor = "#eDF5E1";
                    }

                    const {formattedState, causes, deathCounts, colors } = formatStateForD3(Object.assign({}, this.causesOfDeaths));

                    y = d3.scaleLinear()
                        .domain([0, d3.max(deathCounts)])
                        .range([graphHeight, 0]);

                    x = d3.scaleBand()
                        .domain(causes)
                        .range([0, causes.length*50])
                        .paddingInner(0.2)
                        .paddingOuter(0.2);

                    const rects = graph.selectAll('rect').data(formattedState);

                    //this is wierd code. Its needed to update the rects already on DOM since enter() does it for the ones not in DOM already
                    rects.attr('width', x.bandwidth)
                            .attr('style', d => `fill: ${d.color}`)
                            .attr('height', d => graphHeight-y(d.deathCount))
                            .attr('x', d => x(d.cause))
                            .attr('y', d => y(d.deathCount))
                            .on("mousemove", function(event, d){
                                tooltip
                                    .style("left", event.pageX - 50 + "px")
                                    .style("top", event.pageY - 70 + "px")
                                    .style("display", "inline-block")
                                    .html(d.cause);
                            })
                            .on("mouseout", function(d){ tooltip.style("display", "none");});
                    
                    //enter() allows us to select rects that arent on the screen yet (which is all in this case)
                    //and append() adds new elements for those (yet) uncreated data points
                    //lets just say enter() and append() together are used in D3 to render stuff whose initial amount we dont know yet
                    //see: http://jonathansoma.com/tutorials//d3/using-enter-and-append/

                    //actual rect elements in DOM are created here with append(): See above link for more
                    rects.enter()
                            .append('rect')
                            .attr('width', x.bandwidth)
                            .attr('style', d => `fill: ${d.color}`)
                            .attr('height', d => graphHeight-y(d.deathCount))
                            .attr('x', d => x(d.cause))
                            .attr('y', d => y(d.deathCount))
                            .on("mousemove", function(event, d){
                                tooltip
                                    .style("left", event.pageX - 50 + "px")
                                    .style("top", event.pageY - 70 + "px")
                                    .style("display", "inline-block")
                                    .html(d.cause);
                            })
                            .on("mouseout", function(d){ tooltip.style("display", "none");});

                    
                    //removing deleted deaths from DOM using colors as reference cause thats available in the DOM
                    d3.selectAll("rect").each(function(d,i) {
                    if(!colors.includes(d3.select(this).attr("style").slice(6).trim())){
                        d3.select(this).remove();
                    }
                    });

                    const yAxis = d3.axisLeft(y)
                                    .ticks(causes.length);
                    
                    gYAxis.call(yAxis);
                    
                    gYAxis.selectAll('text')
                        .style('font-size', 14);

                }else{
                    d3.select('svg')
                        .attr('width', 0)
                        .attr('height', 0);

                    document.getElementById('canvas-id').style.backgroundColor = "#379683";
                }

            },
            deep: true //need this because vue watchers dont get called on shallow values only - see: https://stackoverflow.com/questions/50840974/vue-js-watcher-not-working
        }
    }
}
</script>

<style>
@font-face { 
    font-family: "Yusei Magic";
    src: url("../assets/fonts/YuseiMagic-Regular.ttf"); 
}

.canvas{
    background-color: #eDF5E1;
    border-radius: 4px;
    max-height: 610px;
    overflow-y: auto;
    max-width: 98%;
    overflow-x: auto;
    margin: 15px auto;
}

.toolTip {
  font-family: 'Yusei Magic';
  position: absolute;
  display: none;
  min-width: 80px;
  height: auto;
  background: none repeat scroll 0 0 #05386b;
  color: #8ee4af;
  padding: 5px;
  text-align: center;
}
</style>