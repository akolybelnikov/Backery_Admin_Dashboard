export const makeModel = data => {
    let model = {}
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key] && data[key] !== undefined && data[key] !== '') {
                model[key] = data[key]
            }
        }
    }
    return model
}

export const setFormData = (formData, data) => {
    const form = formData
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            if (data[key] && data[key] !== undefined && data[key] !== '') {
                form[key] = data[key]
            }
        }
    }
    return form
}
