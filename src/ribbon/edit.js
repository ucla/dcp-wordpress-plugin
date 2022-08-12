/* eslint-disable no-unused-vars */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import './editor.scss';
import {
    PanelBody,
	SelectControl,
} from '@wordpress/components';
import {
    InspectorControls,
    useBlockProps,
	RichText
} from '@wordpress/block-editor';
import { useState } from '@wordpress/element'

 /**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param {Object} [props]           Properties passed from the editor.
 * @param {Object} [props.attributes]
 * @param {string} [props.setAttributes]
 * @param {string} [props.className] Class name generated for the block.
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	className,
}) {
    let {ribbonContent, highlight} = attributes; 
    
    const blockProps = useBlockProps();
    const [ribbonType, setRibbonType] = useState(highlight);
    // const onMoleculeChange = (value) => {
    //     molecule = value
    //     setAttributes({molecule: value});
    // }
    const onRibbonChange = value => {
        ribbonContent = value;
        setAttributes({ribbonContent: value})
    }
    const onTypeChange = value => {
        
        setAttributes({highlight: value});
    }
    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody>
                    <SelectControl
                        label={__( 'Ribbon Type' )}
                        value={ ribbonType }
                        options={[
                            {label: 'Brand', value: 'brand'},
                            {label: 'Highlight', value: 'highlight'},
                        ]}
                        onChange={selected => {
                            setRibbonType(selected);
                            onTypeChange(selected);
                        }}
                        __nextHasNoMarginBottom
				    />
                </PanelBody>
            </InspectorControls>
            
            <div className={`ribbon${className ? ' ' + className : ''}${ribbonType === 'highlight' ? ' ribbon--highlight' : ''}`}>
                
                <RichText
                    tagName={ribbonType === 'highlight' ? 'h3' : 'h2'}
                    value={ ribbonContent }
                    onChange={ onRibbonChange }
                    placeholder={__('15 of the 20 largest fires in Californian history have occurred since 2000.')}
                    preserveWhiteSpace={false}
                />
            </div>
        </div>
    );
}