const CustomButton=(props)=>{
    const {type,text,classes}=props
    return(type==='primary'?(
        <button className={`bg-primary text-sm md:text-base uppercase hover:bg-linkHover text-white font-bold py-2 px-4 rounded-full md:rounded  ${classes}`}>
            {text}
        </button>
    ):(
        <button className={`bg-secondary text-sm md:text-base uppercase hover:bg-linkHover text-white font-bold py-2 px-4 rounded-full md:rounded ${classes}`}>
            {text}
        </button>
    ))
}
export default CustomButton;