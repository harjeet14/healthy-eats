
import './recipeInfoModal.scss';

export function RecipeInfoModal({ selectedRecipe, onClose }) {

    return <div className="recipeInfoModal">
        <div className="recipeInfoModal-content">
            <div className="recipeInfoModal-content-head">
                <span>{selectedRecipe.title}</span>
            </div>
            <div className="recipeInfoModal-content-body">
                <div className="recipeInfoModal-content-body-flexRow">
                    <fieldset>
                        <legend>{selectedRecipe.title}</legend>
                        <img src={selectedRecipe.image} alt={selectedRecipe.title} />
                    </fieldset>
                    <fieldset>
                        <legend>Summary</legend>
                        <div className='infoHtmlContent' dangerouslySetInnerHTML={{ __html: selectedRecipe.summary }}></div>

                    </fieldset>
                </div>
                <div className="recipeInfoModal-content-body-flexRow">
                    <fieldset>
                        <legend>Instructions</legend>
                        <div className="infoHtmlContent" dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }}></div>

                    </fieldset>
                </div>

            </div>
            <div className="recipeInfoModal-content-head">
                <span className=""></span>

                <span className="recipeInfoModal-content-head-button" onClick={() => onClose()}>Close</span>
            </div>
        </div>
    </div>
}
