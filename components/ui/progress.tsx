export function Progress({ value } : { value: number }) {
    return (
		<div className="progress-bar">
        	<div className="progress-bar__value" style={{ transform: `translateX(-${100 - ( value || 0)}% )` }}></div>
		</div>
    )
}