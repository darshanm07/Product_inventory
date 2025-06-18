const {
    RANDOM_PASSWORD_CHAR,
    SYMBOLS,
    PASSWORD_REGEX,
} = require('../../../config/constants/common')

const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000)
}

const convertToUpperCase = (str) => {
    return str?.toUpperCase().trim().replace(/\s+/g, '_')
}

const regexForSearch = (search, data) => {
    let searchData
    const regexSearch = {
        $regex: search?.replace(/[^\w\.\@ ]/g, '').trim(),
        $options: 'i',
    }
    switch (data) {
        case 'company':
            searchData = search
                ? {
                      $or: [
                          {
                              compNm: regexSearch,
                          },
                      ],
                  }
                : {}
            break
        case 'project':
            searchData = search
                ? {
                      $or: [
                          {
                              title: regexSearch,
                          },
                      ],
                  }
                : {}
            break
        case 'master':
            searchData = search
                ? {
                      $or: [
                          {
                              name: regexSearch,
                          },
                          {
                              code: regexSearch,
                          },
                      ],
                  }
                : {}
            break

            searchData = search
                ? {
                      $or: [
                          {
                              name: regexSearch,
                          },
                          {
                              code: regexSearch,
                          },
                      ],
                  }
                : {}
            break
    }
    return searchData
}

const randomPasswordGenerator = () => {
    try {
        let pass
        start = true
        while (start) {
            pass = ''
            for (var i = 1; i <= 8; i++) {
                var char = Math.floor(
                    Math.random() * RANDOM_PASSWORD_CHAR.length + 1
                )
                if (i == 5) {
                    pass += SYMBOLS.ATRATE || '@'
                }
                pass += RANDOM_PASSWORD_CHAR.charAt(char)
            }
            checkPass = PASSWORD_REGEX.test(pass)
            start = false
            if (!checkPass) {
                start = true
            }
        }
        return pass
    } catch (error) {
        throw new Error(error)
    }
}

const slugify = (text) => {
    return text
        ?.toString()
        .toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

module.exports = {
    generateOTP,
    convertToUpperCase,
    regexForSearch,
    randomPasswordGenerator,
    slugify,
}
