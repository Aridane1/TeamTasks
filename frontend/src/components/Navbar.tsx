export default function Navbar() {
    return (    
        <div className="fixed w-full top-[90%]">
            <div className="bg-navbar/90 py-4 px-2 rounded-full w-[90%] m-auto">
                <div className="flex justify-around">
                    <img src="/images/icons/addTask.svg" alt="" />
                    <img src="/images/icons/homeIcon.svg" alt="" />
                    <img src="/images/icons/chatIcon.svg" alt="" />
                </div>
            </div>
        </div>
    );
}
