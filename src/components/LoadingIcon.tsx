type LoadingIconProps = {
    color: string;
};

const LoadingIcon = (props: LoadingIconProps) => {
    return (
        <div
            className={`inline-block w-5 h-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] ${props.color} motion-reduce:animate-[spin_1.5s_linear_infinite]`}
            role="status"
        >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
            </span>
        </div>
    );
};

export default LoadingIcon
