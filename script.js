const apiKey = "yv2VVzHHuGz6T6IRuvdkEobsWXN0REJph6CRgxt9";
const container = $("#cards-container");
const details = $("#news-details");

$(document).ready(function () {

    getNews("sports");

    $(".nav-item").click(function () {
        let category = $(this).data("category");
        getNews(category);
    });

    $(".search-button").click(function () {
        let text = $(".news-input").val();
        if (text) getNews(text);
    });

    $(".news-input").keydown(function (e) {
    if (e.key === "Enter") {
        e.preventDefault(); 
        $(".search-button").click(); 
    }
});
});

function getNews(topic) {

    $.ajax({
        url: "https://api.thenewsapi.com/v1/news/top",
        method: "GET",
        data: {
            api_token: apiKey,
            search: topic,
            language: "en"
        },

        success: function (response) {

            container.html("");
            details.html("");

            response.data.forEach(function (news) {

                if (!news.image_url) return;

                container.append(`
                    <div class="card"
                         data-title="${news.title}"
                         data-desc="${news.description || ""}"
                         data-image="${news.image_url}"
                         data-source="${news.source}">
                         
                        <img src="${news.image_url}">
                        <h3>${news.title}</h3>
                        <p>${news.description || ""}</p>
                    </div>
                `);
            });

            $(".card").click(function () {

                let title = $(this).data("title");
                let desc = $(this).data("desc");
                let image = $(this).data("image");
                let source = $(this).data("source");

                details.html(`
                    <div class="detail-box">
                        <h2>${title}</h2>
                        <img src="${image}">
                        <p><b>Source:</b> ${source}</p>
                        <p>${desc}</p>
                    </div>
                `);

                window.scrollTo(0, document.body.scrollHeight);
            });
        }
    });

}