import Spinner from "./Spinner";

export default function ViewLoader() {
    return (
        <div className="flex justify-center pt-20">
            <Spinner className="h-20 w-20" strokeWidth={0.7} />
        </div>
    );
}
