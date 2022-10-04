/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss'; 

import { useState, useCallback } from '@wordpress/element';
import {
	KeyboardShortcuts,
	PanelBody,
	TextControl,
	ToggleControl,
	ToolbarButton,
	ToolbarGroup,
	Popover,
	SelectControl,
} from '@wordpress/components';
import {
	BlockControls,
	InspectorControls,
	RichText,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import { link, linkOff } from '@wordpress/icons';

const NEW_TAB_REL = 'noreferrer noopener';

function URLPicker( {
	isSelected,
	url,
	setAttributes,
	opensInNewTab,
	onToggleOpenInNewTab,
} ) {
	const [ isURLPickerOpen, setIsURLPickerOpen ] = useState( false );
	const urlIsSet = !! url;
	const urlIsSetandSelected = urlIsSet && isSelected;
	const openLinkControl = () => {
		setIsURLPickerOpen( true );
		return false; // prevents default behaviour for event
	};
	const unlinkButton = () => {
		setAttributes( {
			url: undefined,
			linkTarget: undefined,
			rel: undefined,
		} );
		setIsURLPickerOpen( false );
	};
	const linkControl = ( isURLPickerOpen || urlIsSetandSelected ) && (
		<Popover
			position="bottom center"
			onClose={ () => setIsURLPickerOpen( false ) }
		>
			<LinkControl
				className="wp-block-navigation-link__inline-link-input"
				value={ { url, opensInNewTab } }
				onChange={ ( {
					url: newURL = '',
					opensInNewTab: newOpensInNewTab,
				} ) => {
					setAttributes( { url: newURL } );

					if ( opensInNewTab !== newOpensInNewTab ) {
						onToggleOpenInNewTab( newOpensInNewTab );
					}
				} }
			/>
		</Popover>
	);
	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{ ! urlIsSet && (
						<ToolbarButton
							name="link"
							icon={ link }
							title={ __( 'Link' ) }
							shortcut={ displayShortcut.primary( 'k' ) }
							onClick={ openLinkControl }
						/>
					) }
					{ urlIsSetandSelected && (
						<ToolbarButton
							name="link"
							icon={ linkOff }
							title={ __( 'Unlink' ) }
							shortcut={ displayShortcut.primaryShift( 'k' ) }
							onClick={ unlinkButton }
							isActive={ true }
						/>
					) }
				</ToolbarGroup>
			</BlockControls>
			{ isSelected && (
				<KeyboardShortcuts
					bindGlobal
					shortcuts={ {
						[ rawShortcut.primary( 'k' ) ]: openLinkControl,
						[ rawShortcut.primaryShift( 'k' ) ]: unlinkButton,
					} }
				/>
			) }
			{ linkControl }
		</>
	);
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param {Object} [props]           Properties passed from the editor.
 * @param {Object} [props.attributes]
 * @param {string} [props.attributes.title]
 * @param {string} [props.attributes.url]
 * @param {string} [props.attributes.linkTarget]
 * @param {string} [props.attributes.rel]
 * @param {string} [props.attributes.style]
 * @param {boolean} [props.attributes.disabled]
 * @param {boolean} [props.attributes.play]
 * @param {string} [props.setAttributes]
 * @param {string} [props.isSelected]
 * @param {string} [props.className] Class name generated for the block.
 * @return {WPElement} Element to render.
 */
export default function Edit( {
	attributes: { title, url, linkTarget, rel, style, disabled, play, size },
	setAttributes,
	isSelected,
	className,
} ) {
	const onChangeTitle = ( value ) => {
		setAttributes( { title: value } );
	};
	const onSetLinkRel = useCallback(
		( value ) => {
			setAttributes( { rel: value } );
		},
		[ setAttributes ]
	);
	const onToggleOpenInNewTab = useCallback(
		( value ) => {
			const newLinkTarget = value ? '_blank' : undefined;

			let updatedRel = rel;
			if ( newLinkTarget && ! rel ) {
				updatedRel = NEW_TAB_REL;
			} else if ( ! newLinkTarget && rel === NEW_TAB_REL ) {
				updatedRel = undefined;
			}

			setAttributes( {
				linkTarget: newLinkTarget,
				rel: updatedRel,
			} );
		},
		[ rel, setAttributes ]
	);
	const onSetStyle = ( newStyle ) => {
		setAttributes( { style: newStyle } );
	};
	const onSetSize = ( newSize ) => {
		setAttributes( { size: newSize } );
	}
	const toggleAttribute = ( attribute ) => {
		return ( newValue ) => {

			newValue = newValue === undefined ? true : newValue;
			setAttributes( { [ attribute ]: newValue } );
		};
	};

	return (
		<div className={ className }>
			<a
				className={ `btn ${ style } ${ play ? 'icon--play' : '' }` }
				disabled={ disabled }
				href={ url }
			>
				<RichText
					withoutInteractiveFormatting
					tagName="span"
					placeholder={ __( 'A cool button…', 'gutenberg-examples' ) }
					value={ title }
					onChange={ onChangeTitle }
				/>
			</a>
			<URLPicker
				url={ url }
				setAttributes={ setAttributes }
				isSelected={ isSelected }
				opensInNewTab={ linkTarget === '_blank' }
				onToggleOpenInNewTab={ onToggleOpenInNewTab }
			/>
			<InspectorControls>
				<PanelBody title={ __( 'Link settings' ) }>
					<ToggleControl
						label={ __( 'Open in new tab' ) }
						onChange={ onToggleOpenInNewTab }
						checked={ linkTarget === '_blank' }
					/>
					<TextControl
						label={ __( 'Link rel' ) }
						value={ rel || '' }
						onChange={ onSetLinkRel }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Button Style' ) }>
					<SelectControl
						label="Button Style"
						value={ style }
						options={ [
							{ label: 'Primary', value: 'btn--lightbg' },
							{ label: 'Primary Dark', value: 'btn--darkbg' },
							{ label: 'Secondary', value: 'btn--secondary--lightbg' },
							{ label: 'Secondary Dark', value: 'btn--secondary--darkbg' },
							{ label: 'Tertiary', value: 'btn--tertiary' },
							{ label: 'Tertiary Dark', value: 'btn--tertiary--darkbg' }
						] }
						onChange={ onSetStyle }
					/>
					<SelectControl
						label="Button Size"
						value={ size }
						options={ [
							{ label: 'Regular', value: '' },
							{ label: 'Small', value: 'btn--sm'},
							{ label: 'X-small', value: 'btn--xs'}
						]}
						onChange={ onSetSize }
					/>
					{ /* <ToggleControl
						label="Disabled"
						help={
							disabled
								? 'Button is disabled.'
								: 'Button is enabled.'
						}
						checked={ disabled }
						onChange={ toggleAttribute( 'disabled' ) }
					/> */ }
					<ToggleControl
						label="Play Icon"
						help={
							play ? 'Play icon show.' : 'No play icon showed.'
						}
						checked={ play }
						onChange={ toggleAttribute( 'play' ) }
					/>
				</PanelBody>
			</InspectorControls>
		</div>
	);
}
