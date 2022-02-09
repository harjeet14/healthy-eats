export function OrderItem({ orderData, onClick }) {
    return <div className="orderItem" title={orderData.strMeal} onClick={() => onClick(orderData)}>
        <img className="orderItem-thumb" src={orderData.strMealThumb} alt={orderData.strMeal} />
        <span className="orderItem-title" >{orderData.strMeal}</span>
    </div>
}