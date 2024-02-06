interface TaskProps {
    task: {
      title: string;
      description: string;
      task_image?: string;
    };

  }
  
  export default function Card({ task }: TaskProps) {
    return (
      <div className="size-80">
        <div className="relative">
          <div className="flex justify-between">
            <p>{task.title}</p>
            <p>{task.description}</p>
          </div>
          <img
            className="rounded max-h-full max-w-full"
            src={`http://localhost:8080/images/${task.task_image}`}
            alt=""
          />
          <div className="w-full flex justify-center">
            <div className="absolute -bottom-3 rounded-full w-[90%] h-[25px] bg-green-400">
              
            </div>
          </div>
        </div>
      </div>
    );
  }
  