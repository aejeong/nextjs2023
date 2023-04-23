export const PATH = {
    HOME: '/',
    ROOMS: '/rooms',
    ROOM_DETAIL : '/rooms/[roomId]'
}

export const BOT_MODEL = {
    DIVINCH: 'text-davinci-003',
    CURIE : 'text-curie-001',
    BABBAGE : 'text-babbage-001',
    ADA : 'text-ada-001',
}

export const ROLE = {
    USER: 'user',
    BOT: 'bot'
}

export const PROFILE_TYPE = {
    USER: {
        model: null,
        name: 'user',
        imgPath: '/images/profile/king-man.png'
    },
    BOT_1: {
        model : BOT_MODEL.DIVINCH,
        name: 'Davinci',
        imgPath: '/images/profile/love-man.png'
    },
    BOT_2: {
         model : BOT_MODEL.CURIE,
        name: 'Curie',
        imgPath: '/images/profile/electric-man.png'
    },
    BOT_3: {
         model : BOT_MODEL.BABBAGE,
        name: 'Babbage',
        imgPath: '/images/profile/bussiness-man.png'
    },
    BOT_4: {
        model : BOT_MODEL.ADA,
        name: 'Adien',
        imgPath: '/images/profile/sprout-man.png'
    },
    WAITING: {
        model: null,
        name: '',
        imgPath: '/images/profile/talking-man.png'
    }
}