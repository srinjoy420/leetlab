export const getJudge0LanguageId=(Language) => {
    const languageMap={
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63
    }
    return languageMap[Language.toUpperCase()]

    
}

export function getLanguageName(languageId){
    const LANGUAGE_NAMES={
        74:"Typescript",
        "PYTHON":71,
        "JAVA":62,
        "JAVASCRIPT":63
    }
    return LANGUAGE_NAMES[languageId] || "unknown"

}

