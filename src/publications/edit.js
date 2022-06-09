/* eslint-disable no-unused-vars */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
 import { __ } from '@wordpress/i18n';

 import {
	PanelBody,
	TextareaControl,
	ExternalLink,
	Button,
	ToggleControl,
} from '@wordpress/components';
import {
	InspectorControls,
	RichText,
	InnerBlocks,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';

export default function Edit({
	attributes,
	setAttributes,
	isSelected,
	className,
}) {
	return (
		<p>Publications</p>
	)
};