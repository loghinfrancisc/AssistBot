import OpenAI from 'openai'
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, dangerouslyAllowBrowser: true
})

const handler = async (event) => {
  try {
    const response = await openai.chat.completions.create({
        messages: event.body,
        model: "ft:gpt-3.5-turbo-0125:personal::9RMdu0if",
        presence_penalty: 0,
        frequency_penalty: 0.1,
        temperature: 0.2
    })
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify({
    //
    //     message: response.choices[0].message
    //     })
    // }
    return {
      statusCode: 200,
      body: JSON.stringify({message: response.choices[0].message})

    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }
