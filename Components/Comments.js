

const Comments = (props) => {
    return (
        <div className="px-2">
            {props.CommentsArr.map((item,i)=>(
                <div className=" h-auto w-full mx-auto  border  shadow-xl flex flex-col  rounded-xl bg-stone-50 text-primaryTxt px-3 py-1 mt-1">
                <div className="w-full flex justify-start h-[30%] py-1 text-[14px]">
                    <div>{item.user}</div>
                    
                </div>
                <div className="w-full py-1 text-[21px] font-semibold">{item.comment}</div>
            </div>
            ))}
        </div>
    )
}
export default Comments
