document.addEventListener('DOMContentLoaded', function () {
    // Get token
    const token = localStorage.getItem('token');

    const favoritosButton = document.getElementById('favoritos-button');

    // Get the DOM elements
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startButton = document.getElementById('start-scrolling');

    // Initialize the timer values
    let minutes = 0;
    let timeInput = null;
    let seconds = 0;
    let scrollInterval;
    let qtdAnuncio = null;


    // Helper function to format the time as mm:ss
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }


    function counter() {
        try {
            const time = parseInt(timeInput.value);
            // Convert the time to seconds
            const totalSeconds = time * 60;
            // Initialize the countdown timer
            minutes = Math.floor(totalSeconds / 60);
            seconds = totalSeconds % 60;
            minutesDisplay.textContent = formatTime(minutes);
            secondsDisplay.textContent = formatTime(seconds);
            const timerInterval = setInterval(() => {
                // Decrement the seconds value
                seconds--;
                // If seconds reaches 0, decrement the minutes value and reset the seconds to 59
                if (seconds < 0) {
                    seconds = 59;
                    minutes--;
                }
                // Update the timer display with the new values
                minutesDisplay.textContent = formatTime(minutes);
                secondsDisplay.textContent = formatTime(seconds);
                // If the timer reaches 0, stop scrolling and the timer
                if (minutes === 0 && seconds === 0) {
                    clearInterval(timerInterval);
                }
            }, 1000);
        }
        catch (error) {
            alert(error)
        }
    }


    const autoScrollWithFavoritesButton = (time, qtdAnuncio, token) => {
        const endTime = Date.now() + time * 60 * 1000;
        let currentHeight = 0;

        const scroll = () => {
            try {
                currentHeight += 30;
                window.scrollTo(0, currentHeight);

                const elements = document.querySelectorAll('.xrvj5dj');

                elements.forEach((el) => {

                    setTimeout(() => { }, 2000);

                    for (let index = 0; index < el.children.length; index++) {
                        const divAnuncio = el.children[index].firstChild;
                        const x = el.children[index].querySelectorAll('.x8t9es0 > strong');
                        let hasFavButton = false;
                        if (x.length > 0) {
                            x.forEach((totalAnuncios) => {
                                const total = parseFloat(totalAnuncios.textContent);
                                if (total >= qtdAnuncio && !hasFavButton) {
                                    // Verificar se a div já possui um botão de favoritos
                                    const existingFavButton = divAnuncio.querySelector('.fav-button');
                                    if (!existingFavButton) {
                                        // Criar o botão de favoritos
                                        const favButton = document.createElement('button');
                                        favButton.classList.add('fav-button');
                                        favButton.textContent = 'Favoritar';

                                        favButton.style.display = 'block';
                                        favButton.style.margin = '20px auto auto';
                                        favButton.style.marginTop = '20px';
                                        favButton.style.padding = '10px 20px';
                                        favButton.style.fontSize = '24px';
                                        favButton.style.color = '#fff';
                                        favButton.style.background = 'linear-gradient(to bottom, #0072FF, #00C6FF)';
                                        favButton.style.border = 'none';
                                        favButton.style.borderRadius = '50px';
                                        favButton.style.boxShadow = '0px 2px 6px rgba(0, 0, 0, 0.3)';
                                        favButton.style.cursor = 'pointer';
                                        favButton.style.transition = 'background-color 0.3s ease-in-out';
                                        // Adicionar o botão de favoritos ao topo da div
                                        divAnuncio.insertBefore(favButton, divAnuncio.firstChild);
                                        favButton.addEventListener('click', async () => {
                                            const element = divAnuncio;
                                            if (!(element instanceof Element)) {
                                                return;
                                            }
                                            // seleciona a div com a classe "_4ik4 _4ik5"
                                            let div = element.querySelector('.x6ikm8r.x10wlt62 ._4ik4._4ik5');
                                            // acessa o texto da div selecionada
                                            let copy = div.textContent;

                                            let imageElement = element.querySelector('.x1ll5gia.x19kjcj4.xh8yej3');

                                            let videoElement = element.querySelector('.x1ywc1zp.x78zum5.xl56j7k.x1e56ztr.xh8yej3')?.firstChild

                                            let imageURL = imageElement?.getAttribute('src') ? imageElement?.getAttribute('src') : false

                                            let videoURL = videoElement?.getAttribute('src') ? videoElement?.getAttribute('src') : false

                                            let quantidade = element.querySelector('.x6s0dn4.x78zum5.xl56j7k.xsag5q8')?.textContent

                                            // seleciona a div com as classes "xeuugli x2lwn1j x78zum5 xdt5ytf"
                                            let divPai = element.querySelector('.xeuugli.x2lwn1j.x78zum5.xdt5ytf');

                                            // seleciona todas as divs com as classes "x3nfvp2" e "x1e56ztr"
                                            let divsFilhas = divPai.querySelectorAll('.x3nfvp2, .x1e56ztr');

                                            let publicado;
                                            let id;
                                            // percorre o array de divs e extrai o texto de cada uma delas
                                            for (let div of divsFilhas) {
                                                if (div.textContent.includes('Veiculação')) {
                                                    publicado = div.textContent
                                                }
                                                if (div.textContent.includes('publicado')) {
                                                    publicado = div.textContent
                                                }
                                                if (div.textContent.includes('Identificação')) {
                                                    id = div.textContent
                                                }
                                            }

                                            const result = {
                                                copy,
                                                publicado,
                                                id,
                                                imageURL,
                                                videoURL,
                                                quantidade
                                            }
                                            console.log(result)
                                            if (token) {

                                                try {
                                                    const response = await fetch('https://adspider.herokuapp.com/favorites', {
                                                        method: 'POST',
                                                        mode: 'cors',
                                                        credentials: 'include', // needed for sending cookies with fetch
                                                        headers: {
                                                            'Content-Type': 'application/json',
                                                            'Authorization': `Bearer ${token}`
                                                        },
                                                        body: JSON.stringify(result)
                                                    });
                                                    const data = await response.json();
                                                    console.log(data);
                                                    alert(data.message)

                                                } catch (err) {
                                                    // Show error alert
                                                    alert(err)
                                                    // showAlert('Erro. Favor tentar novamente.', 'error');
                                                    console.error(err);
                                                }
                                            } else {
                                                console.log('Token not found in localStorage');
                                            }
                                        });
                                    }
                                    hasFavButton = true;
                                }
                            });
                            if (!hasFavButton) {
                                el.removeChild(el.children[index]);
                            }
                        } else {
                            console.log('Elemento não encontrado.');
                            el.removeChild(el.children[index]);
                        }
                    }
                });

                if (currentHeight >= document.documentElement.scrollHeight) {
                    currentHeight = document.documentElement.scrollHeight + 20;
                    // await new Promise(resolve => setTimeout(resolve, 2000));
                }

                if (Date.now() >= endTime) {
                    console.log('acabou o tempo');
                    console.log(token)
                    clearInterval(scrollInterval);
                    window.scrollTo(0, 0);
                }
            } catch (error) {
                console.error(error);
                setTimeout(() => {
                    scroll();
                }, 5000);
            }
        };

        scrollInterval = setInterval(scroll, 100);
    };

    // Add event listener to start button
    startButton.addEventListener('click', async () => {
        timeInput = document.getElementById('time')
        qtdAnuncio = document.getElementById('qtd');
        counter()
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: autoScrollWithFavoritesButton,
            args: [timeInput?.value, qtdAnuncio?.value, token]
        });
    });

    //Listar Favoritos
    favoritosButton.addEventListener('click', () => {
        chrome.tabs.create({ url: 'favoritesList.html' });
    });

})