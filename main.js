//Declaring the Different Variable and Objects
document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'complete') {
        document.getElementById('interactive');
        document.getElementById('load').style.visibility = "hidden";
    }
}

$(document).ready(function () {
    //let new_cases = document.getElementById("new_case");
    //let new_death = document.getElementById("new_death");
    let total_death = document.getElementById("deaths");
    let total_recovered = document.getElementById("recovered");
    let total_cases = document.getElementById("cases");
    //let table = document.getElementById('countries_stat')
    // Fetching the Data from the server

    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/latest_stat_by_country.php?country=india", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "d282797b9fmshe7333c9a61846f6p19a17ejsn5e6555a020b1"
            }
        })
        .then(response => response.json().then(data => {
            console.log(data);
            document.getElementById('india_total_cases').innerHTML = data.latest_stat_by_country[0].total_cases;
            document.getElementById('india_active_cases').innerHTML = data.latest_stat_by_country[0].active_cases;
            document.getElementById('india_total_deaths').innerHTML = data.latest_stat_by_country[0].total_deaths;
            document.getElementById('india_total_recovered').innerHTML = data.latest_stat_by_country[0].total_recovered;
            document.getElementById('india_new_cases').innerHTML = data.latest_stat_by_country[0].new_cases;
            document.getElementById('india_per_million').innerHTML = data.latest_stat_by_country[0].total_cases_per1m;
            // new_cases.innerHTML = data.new_cases;
            // new_death.innerHTML = data.new_deaths;
            // total_death.innerHTML = data.total_deaths;
            // total_recovered.innerHTML = data.total_recovered;

        }))
        .catch(err => {
            console.log(err);
        });


    //Fetching the World Data
    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "d282797b9fmshe7333c9a61846f6p19a17ejsn5e6555a020b1"
            }
        })
        .then(response => response.json().then(data => {
            console.log(data);
            total_cases.innerHTML = data.total_cases;
            // new_cases.innerHTML = data.new_cases;
            // new_death.innerHTML = data.new_deaths;
            total_death.innerHTML = data.total_deaths;
            total_recovered.innerHTML = data.total_recovered;

        })).catch(err => {
            console.log(err);
        });

    //Fetching The Case by Country Data
    // fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
    //         "method": "GET",
    //         "headers": {
    //             "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
    //             "x-rapidapi-key": "d282797b9fmshe7333c9a61846f6p19a17ejsn5e6555a020b1"
    //         }
    //     })
    //     .then(response => response.json().then(data => {
    //         console.log(data)
    //         let countries_stat = data.countries_stat;
    //         //Getting all the country statistic using a loop
    //         for (let i = 0; i < countries_stat.length; i++) {
    //             console.log(countries_stat[i]);
    //             //we will start by inserting the new rows inside our table
    //             let row = table.insertRow(i + 1);
    //             let country_name = row.insertCell(0);
    //             let cases = row.insertCell(1);
    //             let deaths = row.insertCell(2);
    //             let serious_critical = row.insertCell(3);
    //             let recovered_per_country = row.insertCell(4);
    //             country_name.innerHTML = countries_stat[i].country_name;
    //             cases.innerHTML = countries_stat[i].cases;
    //             deaths.innerHTML = countries_stat[i].deaths;
    //             serious_critical.innerHTML = countries_stat[i].serious_critical;
    //             recovered_per_country.innerHTML = countries_stat[i].total_recovered;

    //         }
    //     }))
    //     .catch(err => {
    //         console.log(err);
    //     });
    var countries = [];
    var active = [];
    var recovered = [];
    var deaths = [];

    fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                "x-rapidapi-key": "d282797b9fmshe7333c9a61846f6p19a17ejsn5e6555a020b1"
            }
        })
        .then(response => response.json().then(data => {
            console.log(data);
            let countries_stat = data.countries_stat;
            for (i = 0; i < 15; i++) {
                countries.push(countries_stat[i].country_name);
                var temp = countries_stat[i].active_cases;
                temp = temp.replace(/,/g, "");
                active.push(parseInt(temp));
                var temp = countries_stat[i].total_recovered;
                temp = temp.replace(/,/g, "");
                recovered.push(parseInt(temp));
                var temp = countries_stat[i].deaths;
                temp = temp.replace(/,/g, "");
                deaths.push(parseInt(temp));
            }
            Highcharts.chart('cases_chart', {
                chart: {
                    type: 'column',
                    backgroundColor: '#1e1e1e'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Worst Hit Countries',
                    style: {
                        color: '#ffffff'
                    }
                },
                xAxis: {
                    categories: countries,
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Total confirmed cases',
                        style: {
                            color: '#ffffff'
                        }
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            color: 'red'
                        }
                    },
                    gridLineColor: '#e0e0e0'
                },
                legend: {
                    align: 'right',
                    x: 0,
                    verticalAlign: 'top',
                    y: 50,
                    floating: true,
                    backgroundColor: '#1e1e1e',
                    borderColor: '#e0e0e0',
                    borderWidth: 1,
                    shadow: false,
                    itemStyle: {
                        color: '#ffffff',
                        fontWeight: 'bold'
                    }
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                plotOptions: {
                    column: {
                        stacking: 'normal',
                        dataLabels: {
                            enabled: false
                        },
                        borderRadius: 1
                    }
                },
                series: [{
                    name: 'Deaths',
                    data: deaths,
                    color: '#DA1F26'
                }, {
                    name: 'Active',
                    data: active,
                    color: '#f7eb65'
                }, {
                    name: 'Recovered',
                    data: recovered,
                    color: '#00ff00'
                }],
                navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                }
            });
            //countries_stat.sort((a, b) => (a.total_cases_per_1m_population < b.total_cases_per_1m_population) ? 1 : -1)
            countries_stat.sort(function (a, b) {
                return b.total_cases_per_1m_population - a.total_cases_per_1m_population;
            })
            console.log(countries_stat);
            var countries_per_million = [];
            var per_million = [];
            for (i = 0; i < 10; i++) {
                countries_per_million.push(countries_stat[i].country_name);
                per_million.push(parseInt(countries_stat[i].total_cases_per_1m_population));

            }
            Highcharts.chart('per_million_chart', {
                chart: {
                    type: 'bar',
                    backgroundColor: '#1e1e1e'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: 'Cases per Million of Population',
                    style: {
                        color: '#ffffff'
                    }
                },
                xAxis: {
                    categories: countries_per_million,
                },
                yAxis: {
                    min: 0,
                    title: {
                        enabled: false
                    },
                    stackLabels: {
                        enabled: true,
                        style: {
                            color: 'red'
                        }
                    },
                    gridLineColor: '#e0e0e0'
                },
                tooltip: {
                    headerFormat: '<b>{point.x}</b><br/>',
                    pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                series: [{
                    showInLegend: false,
                    data: per_million,
                    color: '#DA1F26'
                }],
                navigation: {
                    buttonOptions: {
                        enabled: false
                    }
                }
            });

        })).catch(err => {
            console.log(err);
        });
});