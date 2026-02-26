const apiKey = "yv2VVzHHuGz6T6IRuvdkEobsWXN0REJph6CRgxt9";
const container = $("#cards-container");

// load sports news when page opens
$(document).ready(function () {
    getNews("sports");
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

            container.html("");   // clear old news

            response.data.forEach(function (news) {

                if (!news.image_url) return;

                container.append(`
                    <div class="card">
                        <img src="${news.image_url}">
                        <h3>${news.title}</h3>
                        <p>${news.description || ""}</p>
                    </div>
                `);
            });
        }
    });
}

// search button click
$(".search-button").click(function () {
    let text = $(".news-input").val();
    if (text) {
        getNews(text);
    }
});