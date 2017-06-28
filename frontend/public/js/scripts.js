function generatePieChart(data){
    var chart = c3.generate({
        data: {
            columns: data,
            type : 'pie'
        }
    });
}