const CustomButton=(props)=>{
    const {type,text,classes}=props
    return(type==='primary'?(
        <button className={`text-primaryCtaColor capitalize text-[18px] border-primaryCtaColor border shadow-lg rounded-md bg-primaryCta px-[10px] py-[5px] ${classes}`}>
            {text}
        </button>
    ):(
        <button className={`text-secondaryCtaColor capitalize text-[18px] border-primaryCtaColor border shadow-lg rounded-md bg-secondaryCta px-[10px] py-[5px] ${classes}`}>
            {text}
        </button>
    ))
}
export default CustomButton;