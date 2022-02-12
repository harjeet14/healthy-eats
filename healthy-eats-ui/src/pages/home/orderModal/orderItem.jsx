export function OrderItem({ orderData, onClick }) {
    return <div className="orderItem" title={orderData.foodTitle} onClick={() => onClick(orderData)}>
        <span className="orderItem-calories"> Cal: {orderData.calories}</span>
        <img className="orderItem-thumb" src={orderData.foodImage} alt={orderData.foodTitle} />
        <span className="orderItem-title" >{orderData.foodTitle}</span>
    </div>
}