export function OrderItem({ orderData, onClick }) {
    const calories = `Cal: ${Math.floor(orderData.calories).toString().substr(0, 8)}`;
    return <div className="orderItem" title={orderData.foodTitle} onClick={() => onClick(orderData)}>
        <span className="orderItem-calories"> {calories}</span>
        <img className="orderItem-thumb" src={orderData.foodImage} alt={orderData.foodTitle} />
        <span className="orderItem-title" >{orderData.foodTitle}</span>
    </div>
}