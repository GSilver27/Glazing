import checkNumInputs from './checkNumInputs';

const forms = (state) => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input');

    checkNumInputs('input[name="user_phone"]');

    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let result = await fetch(url, {
            method: "POST",
            body: data,
        });

        return await result.text();
    };

    const clearInputs = () => {
        inputs.forEach(input => {
            input.value = '';
        });
    };

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let statusMsg = document.createElement('div');
            statusMsg.classList.add('status');
            item.appendChild(statusMsg);

            const formData = new FormData(item);
            if (item.getAttribute('data-calc') === 'end') {
                for (let key in state) {
                    formData.append(key, state[key]);
                }
            }

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMsg.textContent = message.success;
                })
                .catch(() => statusMsg.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMsg.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;