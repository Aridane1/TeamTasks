export default function Card() {


    return (
        <div className="size-80"> {/* Replace class with className */}
            <div className="relative"> {/* Replace class with className */}
                <div className="flex justify-between"> {/* Replace class with className */}
                    <p>Titulo</p> {/* Add a value for the title variable */}
                    <p>Descripcion</p> {/* Add a value for the title variable */}
                </div>
                <img
                    className="rounded max-h-full max-w-full" 
                    // {/* Replace class with className */}
                    src="/images/image.png"
                    alt=""
                />
                <div className="w-full flex justify-center"> {/* Replace class with className */}
                    <div className="absolute -bottom-3 rounded-full w-[90%] h-[25px] bg-green-400"></div> {/* Replace class with className */}
                </div>
            </div>
        </div>
    );
}
