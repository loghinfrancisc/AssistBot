import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, get, remove } from 'firebase/database'
//
// import OpenAI from 'openai'
// // import { process } from './env'
//
// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true
// })

const firebaseConfig = {
    apiKey: "AIzaSyCDgWZsqii17KgmVfNe3Wpyc525FJDdp8E",
    authDomain: "openai-chatbot-6d22b.firebaseapp.com",
    databaseURL: "https://openai-chatbot-6d22b-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "openai-chatbot-6d22b",
    storageBucket: "openai-chatbot-6d22b.appspot.com",
    messagingSenderId: "878339113334",
    appId: "1:878339113334:web:dbb5c7ed8e3d2073333a57"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const conversationInDb = ref(db)

const chatbotConversation = document.getElementById('chatbot-conversation')

const instructionObj = {
    "role": "system",
    "content": "You're a very knowledgeable assistant that is always eager to help."
}

document.addEventListener('submit', async (e) => {
    e.preventDefault()
    const userInput = document.getElementById('user-input')
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-human')
    chatbotConversation.appendChild(newSpeechBubble)
    newSpeechBubble.textContent = userInput.value

    chatbotConversation.scrollTop = chatbotConversation.scrollHeight

    try {
        await pushUserMessage(userInput.value)
        userInput.value = ''
        await fetchReply()
    } catch (error) {
        console.error('Error:', error.message)
    }

})

document.getElementById('clear-btn').addEventListener('click', async () => {
    try {
        await clearConversation()
    } catch (error) {
        console.error('Error:', error.message)
    }
})

async function pushUserMessage(content) {
    try {
        await push(conversationInDb, {
            "role": "user",
            "content": content
        })
    } catch (error) {
        console.error('Error pushing user message:', error.message)
        throw error // Re-throw the error for upstream handling if needed
    }
}

async function clearConversation() {
    try {
        await remove(conversationInDb)
        chatbotConversation.innerHTML = '<div class="speech speech-ai">How can I help you?</div>'
    } catch (error) {
        console.error('Error clearing conversation:', error.message)
        throw error // Re-throw the error for upstream handling if needed
    }
}

async function fetchReply() {
    try {

        const snapshot = await get(conversationInDb)
        if (snapshot.exists()) {
            const conversationArray = Object.values(snapshot.val())
            conversationArray.unshift(instructionObj)

            const url = 'https://glistening-sfogliatella-2343da.netlify.app/.netlify/functions/fetchAI'
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: conversationArray
            })
            const data = await response.json()
            console.log(data)

            // const response = await openai.chat.completions.create({
            //     messages: conversationArray,
            //     model: "ft:gpt-3.5-turbo-0125:personal::9RMdu0if",
            //     presence_penalty: 0,
            //     frequency_penalty: 0.1,
            //     temperature: 0.2
            // })
            // await push(conversationInDb, response.choices[0].message)
            // renderTypewriterText(response.choices[0].message.content)
        } else {
            console.log("No data available");
        }
    } catch (error) {
        console.error('Error fetching reply:', error.message)
    }
}

function renderTypewriterText(text) {
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-ai', 'blinking-cursor')
    chatbotConversation.appendChild(newSpeechBubble)
    let i = 0
    let isManuallyScrolling = false

    const interval = setInterval(() => {
        newSpeechBubble.textContent += text.slice(i-1, i)
        if (text.length === i) {
            clearInterval(interval)
            newSpeechBubble.classList.remove('blinking-cursor')
        }
        i++
        if (!isManuallyScrolling) {
            chatbotConversation.scrollTop = chatbotConversation.scrollHeight
        }
    }, 50);

    // Event listener to detect manual scrolling
    chatbotConversation.addEventListener('scroll', () => {
        isManuallyScrolling = chatbotConversation.scrollTop < chatbotConversation.scrollHeight - chatbotConversation.offsetHeight;
    });
}

function renderConversationFromDB() {
    get(conversationInDb).then(async (snapshot) => {
        if (snapshot.exists()) {
            Object.values(snapshot.val()).forEach(message => {
                const newSpeechBubble = document.createElement('div')
                newSpeechBubble.classList.add(
                    'speech',
                    `speech-${message.role === 'user' ? 'human' : 'ai'}`
                )
                chatbotConversation.appendChild(newSpeechBubble)
                newSpeechBubble.textContent = message.content
            })
            chatbotConversation.scrollTop = chatbotConversation.scrollHeight
        }
        else {
            console.log("No data available");
        }
    }).catch(error => {
        console.error('Error rendering conversation from DB:', error.message)
    })
}

renderConversationFromDB()
