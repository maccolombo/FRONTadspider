document.addEventListener('DOMContentLoaded', function () {

    // Get token
    const token = localStorage.getItem('token');
    // alert(token)

    fetch("https://adspider.herokuapp.com/favorites/listar", {
        method: "GET",
        mode: 'cors',
        credentials: 'include', // needed for sending cookies with fetch
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            const favoritesDiv = document.getElementById('favorites');

            data.favorites.forEach((favorite) => {
                const favoriteData = favorite.data;

                const favoriteContainer = document.createElement('div');
                favoriteContainer.classList.add('favorite-item');

                const copy = document.createElement('p');
                copy.textContent = favoriteData.copy;
                favoriteContainer.appendChild(copy);

                if (favoriteData.imageURL) {
                    const image = document.createElement('img');
                    image.src = favoriteData.imageURL;
                    // image.controls = true;
                    // image.width = 380; // Define a largura do image como 640 pixels
                    // image.height = 150; // Define a altura do image como 360 pixels
                    favoriteContainer.appendChild(image);
                }
                if (favoriteData.videoURL) {
                    const video = document.createElement('video');
                    video.src = favoriteData.videoURL;
                    video.controls = true;
                    video.width = 380; // Define a largura do vídeo como 640 pixels
                    video.height = 150; // Define a altura do vídeo como 360 pixels
                    favoriteContainer.appendChild(video);
                }
                if(!favoriteData.videoURL && !favoriteData.imageURL){
                    const image = document.createElement('img');
                    image.src = 'https://amici.com.br/wp-content/uploads/sites/83/2020/04/imagem-indispon%C3%ADvel-300x225.jpg';
                    favoriteContainer.appendChild(image);
                }

                favoritesDiv.appendChild(favoriteContainer);
            });
        })
        .catch((error) => console.log(error));
});
