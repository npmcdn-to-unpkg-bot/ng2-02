$(function() {

    Morris.Line({
        element: 'morris-area-chart',
        data: [{
            day: '2016-06-13',
            errors: 125,
            messages: 2389,
        }, {
            day: '2016-06-14',
            errors: 68,
            messages: 2899,
        }, {
            day: '2016-06-15',
            errors: 298,
            messages: 1567,
        }, {
            day: '2016-06-16',
            errors: 123,
            messages: 3778,
        }, {
            day: '2016-06-17',
            errors: 67,
            messages: 1342,
        }, {
            day: '2016-06-18',
            errors: 140,
            messages: 2567,
        }, {
            day: '2016-06-19',
            errors: 178,
            messages: 2780,
        }],
        xkey: 'day',
        ykeys: ['messages', 'errors'],
        labels: ['Messages', 'Errors'],
        lineColors: ['green', 'red'],
    });

    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Download Sales",
            value: 12
        }, {
            label: "In-Store Sales",
            value: 30
        }, {
            label: "Mail-Order Sales",
            value: 20
        }],
        resize: true
    });
});
