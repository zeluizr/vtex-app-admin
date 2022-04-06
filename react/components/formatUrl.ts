export function formatUrl(host: string) {
    return host.replace(
        /(https:\/\/www\.)|(https:\/\/)|(http:\/\/)|(http:\/\/www\.)|(www\.)/gi,
        ""
    );
}
