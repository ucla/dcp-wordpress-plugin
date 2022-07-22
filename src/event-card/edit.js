/* eslint-disable no-unused-vars */
/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import {
	PanelBody,
	SelectControl,
} from '@wordpress/components';

import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element'

 /**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param {Object} [props]           Properties passed from the editor.
 * @param {Object} [props.attributes]
 * @param {string} [props.setAttributes]
 * @param {string} [props.isSelected]
 * @param {string} [props.className] Class name generated for the block.
 * @return {WPElement} Element to render.
 */
export default function Edit( {
	attributes,
	setAttributes,
	isSelected,
	className,
} ) {
	const [eventSelection, setEventSelection] = useState('upcoming');

    const blockProps = useBlockProps();
	const events = useSelect(select => select('core').getEntityRecords('postType', 'events', {_embed: true}));

	const updateEventSelection = (value) => {
		setAttributes( {
			eventSelection: value,
		})
	 }

	const compareEventDateWithToday = (startDate) => {
		const today = new Date();
		const todayMonth = today.getMonth() + 1;
		const todayDay = today.getDate();
		const todayYear = today.getFullYear();
		const todayRendered = `${todayYear}-${todayMonth}-${todayDay}`;
		let parsedToday = Date.parse(todayRendered);
		let parsedEvent = Date.parse(startDate);
		if (parsedToday > parsedEvent) {
			return true;
		} else if (parsedToday < parsedEvent) {
			return false;
		} else {
			return true;
		}
	}

	const renderSwitch = param => {
		switch (param) {
			case 'upcoming':
				
				return events.filter(convention => compareEventDateWithToday(convention.event_start_date.rendered) === false).map(convention => <div>{convention.title.raw}</div>)
				
				break;
			case 'past':
				
				return events.filter(convention => compareEventDateWithToday(convention.event_start_date.rendered) === true).map(convention => <div>{convention.title.raw}</div>)
				
				break;
			default:
				
				return events.map(convention => <div>{convention.title.raw}</div>)
				
				break;
		}
	}

	// if (events) {
	// 	events.map(convention => {
	// 		console.log(compareEventDateWithToday(convention.event_start_date.rendered))
	// 	})
	// }
    // console.log('events', events)
	// console.log(new Date().getMonth())
    return (
		<>
			<InspectorControls>
				<PanelBody title={__('Event Block Options')}>
				<SelectControl
					label={__( 'Upcoming or Past Events' )}
					value={ eventSelection }
					options={[
						{label: 'Upcoming', value: 'upcoming'},
						{label: 'Past', value: 'past'},
						{label: 'Both', value: 'both'},
					]}
					onChange={(selected) => {
						setEventSelection(selected)
						updateEventSelection(selected);
					 }}
					__nextHasNoMarginBottom
				/></PanelBody>
			</InspectorControls>
        	<div {...blockProps}>
			{!events && 'Loading...'}
			{events && events.length === 0 && 'No Events'}
			{events && events.length > 0 &&
				renderSwitch(eventSelection)
			}
			</div>
		</>
    )
}