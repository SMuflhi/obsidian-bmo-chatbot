import { Setting, SettingTab } from "obsidian";
import BMOGPT, { DEFAULT_SETTINGS } from "src/main";

export function addAPIConnectionSettings(containerEl: HTMLElement, plugin: BMOGPT, SettingTab: SettingTab) {
    containerEl.createEl('h2', {text: 'API Connections'});

    new Setting(containerEl)
    .setName('API Key')
    .setDesc('Insert API Key.')
    .addText(text => text
        .setPlaceholder('insert-api-key')
        .setValue(plugin.settings.apiKey ? `${plugin.settings.apiKey.slice(0, 6)}-...${plugin.settings.apiKey.slice(-4)}` : "")
        .onChange(async (value) => {
            plugin.settings.apiKey = value;
            await plugin.saveSettings();
        })
        .inputEl.addEventListener('focusout', async () => {
            SettingTab.display();
        })
    );

    new Setting(containerEl)
    .setName('OPENAI BASE URL')
    .setDesc('Enter your custom OpenAI-base url.')
    .addButton(button => button
        .setButtonText("Restore Default")
        .setIcon("rotate-cw")
        .setClass("clickable-icon")
        .onClick(async () => {
            plugin.settings.openAIBaseUrl = DEFAULT_SETTINGS.openAIBaseUrl;
            await plugin.saveSettings();
            SettingTab.display();
        })
    )
    .addText(text => text
        .setPlaceholder('https://api.openai.com/v1')
        .setValue(plugin.settings.openAIBaseUrl || DEFAULT_SETTINGS.openAIBaseUrl)
        .onChange(async (value) => {
                plugin.settings.openAIBaseUrl = value ? value : DEFAULT_SETTINGS.openAIBaseUrl;
                await plugin.saveSettings();
            })
        .inputEl.addEventListener('focusout', async () => {
            SettingTab.display();
        })
    );
}