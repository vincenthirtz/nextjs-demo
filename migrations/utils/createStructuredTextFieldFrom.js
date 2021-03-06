module.exports = async function createStructuredTextFieldFrom(
    client,
    modelApiKey,
    fieldApiKey,
    modelBlockIds
) {
    const legacyField = await client.fields.find(
        `${modelApiKey}::${fieldApiKey}`
    );

    const newApiKey = `structured_text_${fieldApiKey}`;
    const label = `${legacyField.label} (Structured-text)`;

    console.log(`Creating ${modelApiKey}::${newApiKey}`);

    console.log("modelBlockIds ", modelBlockIds)

    const toNumbers = arr => arr.map(Number);

    const test = toNumbers(modelBlockIds)

    console.log("test ", test)

    return client.fields.create(modelApiKey, {
        label,
        apiKey: newApiKey,
        fieldType: "structured_text",
        fieldset: legacyField.fieldset,
        validators: {
            structured_text_blocks: {
                item_types: [],
            },
            structured_text_links: {
                item_types: [],
            },
        },
    });
};
