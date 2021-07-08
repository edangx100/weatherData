import { Line } from 'react-chartjs-2'

function LineChart (props) {

    // console.log( "LineChart component" );
    // console.log( props.dataList );

    const data = {
        labels: props.dataList.map(obj => obj.hour),
        datasets: [
        {
            label: props.type,
            data: props.dataList.map(obj => obj.value),
            borderColor: ['rgba(255, 206, 86, 0.2)'],
            // backgroundColor: ['rgba(255, 206, 86, 0.2)'],
            backgroundColor: 'rgba(171, 183, 183, 0.1)',
            // pointBackgroundColor: 'rgba(255, 206, 86, 0.2)',
            // pointBorderColor: 'rgba(255, 206, 86, 0.2)',
            fill: true
        },
        ]
    }

  const options = {
    title: {
      display: true,
      text: 'Line Chart'
    }
  }

  return <Line data={data} options={options} />
}

export default LineChart