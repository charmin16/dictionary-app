import React, { useState, useEffect } from 'react'

const Dictionary = () => {

    const [dictDetails, setDictDetails] = useState('')
    const [searchWord, setSearchWord] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchData = async () => {
        setError(null)
        setLoading(true)
        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
            const data = await res.json()
            if (!res.ok) {
                throw new Error('Word Not Found! Pls Check Your Spelling and Try Again')
            }
            console.log(data)
            setDictDetails(data[0])
            setLoading(false)
        } catch (error) {
            console.log(error.message)
            setError(error)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        fetchData()
        setSearchWord('')
    }

    return (
    <div className='flex flex-col items-center md:pt-12 md:pb-12 w-[90%] mx-auto 
       py-6 text-lg md:text-xl sm:w-[65%] md:w-[45%] space-y-8'>
            <h2 className="text-2xl md:text-3xl font-bold">Dictionary</h2>
            <form onSubmit={submitHandler} className='w-[100%]'>
                <div className='relative bg-orange-900 w-[100%]'>
                    <input
                        onChange={(e) => setSearchWord(e.target.value)}
                        value={searchWord}
                        type="text"
                        className='py-3 pl-6 bg-gray-300 rounded-2xl w-[100%] text-black' />
                    <i onClick={submitHandler} className="fa-solid fa-magnifying-glass absolute right-4 top-[31%] text-purple-500 cursor-pointer"></i>
                </div>
            </form>
        
            {/* Output section  */}
            {error ? <div>{error.message}</div> : <section className='w-[100%]'>
                <section id="output" className='w-[100%]'>
                    {dictDetails && (
                        <div className="flex flex-col space-y-4">
                            <div id="entry-playzz" className='flex items-center justify-between w-[100%] md:px-6 px-2 py-2 bg-gray-600 rounded-lg'>
                                <h1 className='font-bold text-2xl md:text-3xl'>{dictDetails.word}</h1>
                                <a href={dictDetails.phonetics[0].audio} target="_blank" rel='noopener noreferrer'>
                                    <i className="fa-solid fa-circle-play fa-2x"></i>
                                </a>
                            </div>
                            <div id="phonetics">
                                <p className='pl-2 md:pl-6 pb-2'>{dictDetails.phonetic}</p>
                            </div>
                        </div>
                    )}
                </section>
        
                {/* Output section  */}
                <section id="noun-cont" className='w-[100%] space-y-4'>
                    {dictDetails && (
                        dictDetails.meanings.map((noun, index) => (
                            <div key={index} className={noun.partOfSpeech === 'noun' ? 'show' : 'hide'}>
                                <div id="noun" className='flex justify-between md:px-6 px-2 w-[100%]'>
                                    <p className='font-bold w-[7%] '>noun</p>
                                    <div className='w-[70%] md:w-[80%] h-[0.05em] opacity-80 bg-gray-200 translate-y-4'></div>
                                </div>
                                <p className="opacity-40 italic md:pl-6 pl-2 pt-4">Meaning</p>
                            </div>
                        ))
                    )}
                </section>

                <section id='noun-cont'>
                    <div>
                        {dictDetails && (
                            dictDetails.meanings.map((meaning, index) => (
                                <div key={index}>
                                    {meaning.partOfSpeech === 'noun' && <div>
                                        {meaning.definitions.map((item, index) => (
                                            <ul key={index} className='pl-8 md:pl-12'>
                                                <li className='list-disc py-2'>{item.definition}</li>
                                            </ul>
                                        ))}
                                    </div>}
                                </div>
                            ))
                        )}
                    </div>
                </section>
        
                <section id="verb-cont" className='w-[100%] space-y-4'>
            
                    {dictDetails && (
                        dictDetails.meanings.map((noun, index) => (
                            <div key={index} className={noun.partOfSpeech === 'verb' ? 'show' : 'hide'}>
                                <div id="verb" className='flex justify-between md:px-6 px-2 w-[100%]'>
                                    <p className='font-bold w-[7%]'>verb</p>
                                    <div className='w-[70%] md:w-[80%] h-[0.05em] opacity-80 bg-gray-200 translate-y-4'></div>
                                </div>
                                <p className="opacity-40 italic md:px-6 pl-2 pt-4">Meaning</p>
                            </div>
                        ))
                    )}

                    <div>
                        {dictDetails && (
                            dictDetails.meanings.map((meaning, index) => (
                                <div key={index}>
                                    {meaning.partOfSpeech === 'verb' && <div>
                                        {/* <li>{meaning.partOfSpeech}</li> */}
                                        {meaning.definitions.map((item, index) => (
                                            <ul key={index} className='md:pl-12 pl-8'>
                                                <li className='list-disc py-2'>{item.definition}</li>
                                            </ul>
                                        ))}
                                    </div>}
                                </div>
                            ))
                        )}
                    </div>
                </section>
        
                <section id="adjective-cont" className='w-[100%] space-y-4'>
                    {dictDetails && (
                        dictDetails.meanings.map((adj, index) => (
                            <div key={index} className={adj.partOfSpeech === 'adjective' ? 'show' : 'hide'}>
                                <div id="adjective" className='flex justify-between md:px-6 px-2 w-[100%]'>
                                    <p className='font-bold w-[7%] '>adjective</p>
                                    <div className='w-[68%] md:w-[78%] h-[0.05em] opacity-80 bg-gray-200 translate-y-4'></div>
                                </div>
                                <p className="opacity-40 italic md:px-6 pl-2 pt-4">Meaning</p>
                            </div>
                        ))
                    )}

                    <div>
                        {dictDetails && (
                            dictDetails.meanings.map((meaning, index) => (
                                <div key={index}>
                                    {meaning.partOfSpeech === 'adjective' && <div>
                                        {/* <li>{meaning.partOfSpeech}</li> */}
                                        {meaning.definitions.map((item, index) => (
                                            <ul key={index} className='pl-8 md:pl-12'>
                                                <li className='list-disc py-2'>{item.definition}</li>
                                            </ul>
                                        ))}
                                    </div>}
                                </div>
                            ))
                        )}
                    </div>
                </section>
        
                <section id="adverb-cont" className='w-[100%] space-y-4'>
            
                    {dictDetails && (
                        dictDetails.meanings.map((adv, index) => (
                            <div key={index} className={adv.partOfSpeech === 'adverb' ? 'show' : 'hide'}>
                                <div id="noun" className='flex justify-between md:px-6 px-2 w-[100%]'>
                                    <p className='font-bold w-[7%] '>adverb</p>
                                    <div className='w-[70%] md:w-[80%] h-[0.05em] opacity-80 bg-gray-200 translate-y-4'></div>
                                </div>
                                <p className="opacity-40 italic md:pl-6 pl-2 pt-4">Meaning</p>
                            </div>
                        ))
                    )}
            
                    <div>
                        {dictDetails && (
                            dictDetails.meanings.map((meaning, index) => (
                                <div key={index}>
                                    {meaning.partOfSpeech === 'adverb' && <div>
                                        {/* <li>{meaning.partOfSpeech}</li> */}
                                        {meaning.definitions.map((item, index) => (
                                            <ul key={index} className='md:pl-12 pl-8'>
                                                <li className='list-disc py-2'>{item.definition}</li>
                                            </ul>
                                        ))}
                                    </div>}
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </section>}
        
        </div>
     
    )         
}
          

export default Dictionary