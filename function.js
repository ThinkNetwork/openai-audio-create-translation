window.function = async function(api_key, audio_file, model, prompt, response_format, temperature) {
    // Validate API Key
    if (!api_key.value) {
        return "Error: OpenAI API Key is required.";
    }

    // Validate Required Parameters
    if (!audio_file.value) {
        return "Error: Audio file is required.";
    }
    if (!model.value) {
        return "Error: Model is required.";
    }

    // Construct request payload
    const formData = new FormData();
    formData.append("file", audio_file.value);
    formData.append("model", model.value);

    // Add optional parameters if provided
    if (prompt.value) formData.append("prompt", prompt.value);
    if (response_format.value) formData.append("response_format", response_format.value);
    if (temperature.value) formData.append("temperature", temperature.value);

    // API endpoint URL
    const apiUrl = "https://api.openai.com/v1/audio/translations";

    // Make API request
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${api_key.value}`
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            return `Error ${response.status}: ${errorData.error?.message || "Unknown error"}`;
        }

        // Return translated text
        const responseData = await response.json();
        return responseData.text;

    } catch (error) {
        return `Error: Request failed - ${error.message}`;
    }
};
