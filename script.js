const api = 'https://disease.sh/v3/covid-19/historical/all?lastdays=180';

const getData = async () => {
    const response = await fetch(`${api}`);
    if (response.ok) {
        return await response.json();
    } else {
        return Promise.reject(response.status);
    }
};

const result = getData();
result
  .then((data) => {
    let date = Object.keys(data.cases);
    let total = Object.values(data.cases);
    let deaths = Object.values(data.deaths);
    let recovered = Object.values(data.recovered);

    var ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: date,
        datasets: [
          {
            label: 'Total',
            data: total,
            borderColor: '#cf0000',
            fill: false,
          },
          {
            label: 'Recovered',
            data: recovered,
            borderColor: '#4ca1a3',
            fill: false,
          },
          {
            label: 'Deaths',
            data: deaths,
            borderColor: '#907fa4',
            fill: false,
          },
        ],
      },
    });
  })
  .catch((error) => {
    console.log('Error: ', error);
  });