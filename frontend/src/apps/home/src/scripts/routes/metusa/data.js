define([], function() {
    var data = [];
    [1, 2, 3, 4, 5].forEach(function(i) {
        data.push({
            id: i,
            imgUrl: "./assets/images/metusa/" + i + ".jpeg",
            title: "去美国生宝宝 产后忌口",
            desc: "月子里忌口，在民间甚为流行。有的地方至今流传着月子里除了吃小米粥和鸡蛋以外，其他什么都忌。这种忌口的习俗是不科学的。这是因为坐月子期间需要大量的营养，一是用来补充",
            content: "月子里忌口，在民间甚为流行。有的地方至今流传着月子里除了吃小米粥和鸡蛋以外，其他什么都忌。这种忌口的习俗是不科学的。这是因为坐月子期间需要大量的营养，一是用来补充",
            date: "2017-11-24 09:23:39",
            viewCount: "93"
        });
    });
    return data;
});