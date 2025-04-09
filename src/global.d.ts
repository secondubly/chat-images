
declare global {

    // since we never use the game object before 'init'
    // we can just tell fvtt-types that the game object is ready
    interface AssumeHookRan {
        ready: true;
    }

    interface SettingConfig {
        'chat-images.uploadLocation': string,
        'chat-images.uploadButton': boolean
    }
}
