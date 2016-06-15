import cookie from 'cookie'

function setCsrfHeaders() {
    const { csrftoken } = cookie.parse(document.cookie)

    if ( ! csrftoken) {
        throw "CSRF Token is required"
    }

    return { 'X-CSRFToken': csrftoken }
}

export default {
    setCsrfHeaders
}
