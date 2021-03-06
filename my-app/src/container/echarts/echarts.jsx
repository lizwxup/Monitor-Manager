import React,{Component} from 'react'
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
class EchartsTest extends Component {
    constructor(props) {
        super(props)
        // console.log(props)
        // console.log('props的值')
        //this.initPie = this.initPie.bind(this)    
        this.state = {
            someThings: props.infoList
        };
        this.infoList = [100, 100, 100, 300, 690, 100,100,120,500,40,30,500]
    }
    componentWillReceiveProps(nextProps) {
        this.setState({someThings: nextProps.infoList});
    }
    shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextProps)
        // console.log(nextState)
        // console.log('nextProps && nextState')
        return false
    }
    initPie (data) {
      // console.log('checked 的选择性'+data)
       var myChart = echarts.init(document.getElementById('main'));
     //    console.log(myChart)
     //    console.log('mychart的值')
        // 绘制图表
       myChart.setOption({
            title: { text: '销售量' },
            tooltip: {},
            xAxis: {
                data: ["1月", "2月", "3月", "4月", "5月", "6月","7月","8月","9月","10月","11月","12月"]
            },
            yAxis: {},
            series: [{
                name: '销售额趋势',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#83bff6'},
                                {offset: 0.5, color: '#188df0'},
                                {offset: 1, color: '#188df0'}
                            ]
                        )
                    },
                    emphasis: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#2378f7'},
                                {offset: 0.7, color: '#2378f7'},
                                {offset: 1, color: '#83bff6'}
                            ]
                        )
                    }
                },
                data: data
            }]
        })
        // myChart.setOption(option);
        // console.log('绑定的数据')
        // console.log(option)
        // console.log(data)
      //  window.addEventListener('resize', this.onWindowResize)
    }
    // onWindowResize () {
    //     var myChart = echarts.init(document.getElementById('main'));
    //     myChart.resize();
    // };   
    componentDidUpdate() {
        this.initPie(this.props.infoList)
    } 
    // componentWillMount() {
    //     this.initPie([30, 200, 400, 300, 690, 1000,200,120,500,40,50,700])
    // }
    componentDidMount() {
        // console.log(this.props)
        // console.log('swwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww')
        this.initPie(this.props.infoList)
    }

    onTextChange () {
       var  newState= '这是数据啊' 
        //这里将子组件的信息传递给了父组件  
       //this.props.callbackParent(newState);     
       fetch('http://117.78.33.100:8080/yysite/v1/article/details?article_id=3',{
          method: 'get',
       }).then((res)=>{
            if(res.ok) {
                res.text().then((data)=> {
                     console.log(data);
                })
            }
       }).catch((error)=>{
            console.log(error)
       })
    }
    handleClick () {
        // console.log(this.props.infoList)
        this.initPie([10, 100, 400, 300, 690, 1000,200,120,500,40,50,700])
        // console.log('点击事件的按钮')
    }
    render () {
        //console.log('表格中所传过来的值：'+this.props.checked)
        var infoList = this.props;
          //let infoList = this.state.infoList;
        //   console.log(infoList)
        //   console.log('切换传过来的值')
        return (
            <div>
                {/*<button onClick={this.onTextChange.bind(this)}>点击事件</button>*/}
                
                <div id="main" style={{width: '100%', height: 400 }} option={this.props.infoList}></div>
                <button onClick={this.handleClick.bind(this)}>获取数据</button>
                {/*{
                infoList.map((item, index)=>{
                    return  <div key={index}  id="main" style={{width: '100%', height: 400 }} > swswsw</div>
                })
              }*/}
            </div>
        );
    }
}

export default EchartsTest;