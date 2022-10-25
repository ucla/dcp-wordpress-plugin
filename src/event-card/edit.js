/* eslint-disable no-unused-vars */
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

import {
	PanelBody,
	SelectControl,
	RangeControl,
} from '@wordpress/components';

import {
	useBlockProps,
	InspectorControls
} from '@wordpress/block-editor';

import { useSelect } from '@wordpress/data';
import { useState } from '@wordpress/element';

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
	clientId,
	className,
} ) {
	const [eventSelection, setEventSelection] = useState(attributes['eventSelection']);

    const blockProps = useBlockProps({
		className: className + ' event-cards'
	});

	let {numberOfEvents, blockId} = attributes;
	setAttributes({blockId: `card-${clientId}`})
	const events = useSelect(select => select('core').getEntityRecords('postType', 'events', {_embed: true}));

	const onChangeEventsNumber = (value) => {
		numberOfEvents = value; 
		setAttributes( {
		   numberOfEvents: value,
		})
	 }

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

	let eventHtml = (title, link, image, date, time, location, description) => {
		const d = new Date(`${date} ${time}:00`);
		
		let month = d.toLocaleDateString('en-US', {month: 'long'});
		let monthAttr = d.toLocaleDateString('en-US', {month: '2-digit'});
		let day = d.toLocaleDateString('en-US', {weekday: 'long'});
		let dayNum = d.toLocaleString('en-US', {day: '2-digit'});
		let year = d.toLocaleDateString('en-US', {year: 'numeric'});
		let formatTime = d.toLocaleTimeString([], {hour: 'numeric' ,minute: '2-digit', hour12: true});
		let isPastEvent = compareEventDateWithToday(date);
		return (
			<article className={`event-card${isPastEvent ? ' past-event' : ' upcoming-event'}`}>
				<div className="event-card__date">
					<div className="event-card__date-info">
						<time dateTime={`${year}-${monthAttr}-${dayNum}`}>{`${day}, ${month} ${dayNum}, ${year}`}</time>
					</div>
				</div>
				<a class="event-card__link" href={link} title={title}>
				{image &&
					<img className="event-card__image" src={image} alt={title} />
				}
				<h3 className="event-card__title"><span>{title}</span></h3>
				</a>
				<div className="event-card-info">
					<div class="event-card-info__time">
						<object className="event-card-icon__time" tabIndex={-1} data="https://cdn.webcomponents.ucla.edu/1.0.0/icons/denotive/time--grey60.svg" type="image/svg+xml" />
						{formatTime}
					</div>
					<div className="event-card-info__location">
						<object className="event-card-icon__location" tabIndex={-1} data="https://cdn.webcomponents.ucla.edu/1.0.0/icons/denotive/location--grey60.svg" type="image/svg+xml" />
						{location}
					</div>
					<div className="event-card-info__description">
						{description}
					</div>
				</div>
			</article>
		);
	};

	const renderSwitch = param => {
		switch (param) {
			case 'upcoming':
				
				return events.filter(convention => compareEventDateWithToday(convention.event_start_date.rendered) === false).slice(0, Number(numberOfEvents)).sort((a,b) => new Date(b.event_start_date.rendered) - new Date(a.event_start_date.rendered)).map(convention => {
					let featImage = convention._embedded ? convention._embedded['wp:featuredmedia'][0].source_url : false;
					return eventHtml(convention.title.raw, convention.link, featImage, convention.event_start_date.rendered, convention.event_time.rendered, convention.event_location.rendered,convention.excerpt.raw)
				})
				
				break;
			case 'past':
				
				return events.filter(convention => compareEventDateWithToday(convention.event_start_date.rendered) === true).slice(0, Number(numberOfEvents)).sort((a,b) => new Date(b.event_start_date.rendered) - new Date(a.event_start_date.rendered)).map(convention => {
					let featImage = convention._embedded ? convention._embedded['wp:featuredmedia'][0].source_url : false;
					return eventHtml(convention.title.raw, convention.link, featImage, convention.event_start_date.rendered, convention.event_time.rendered, convention.event_location.rendered,convention.excerpt.raw)
				})
				
				break;
			default:
				
				return events.sort((a,b) => new Date(b.event_start_date.rendered) - new Date(a.event_start_date.rendered)).slice(0, Number(numberOfEvents)).map(convention => {
					let featImage = convention._embedded ? convention._embedded['wp:featuredmedia'][0].source_url : false;
					return eventHtml(convention.title.raw, convention.link, featImage, convention.event_start_date.rendered, convention.event_time.rendered, convention.event_location.rendered,convention.excerpt.raw)
				})
				
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
				<PanelBody title={ __( 'Number of Events' ) }>
					<RangeControl
						value={Number(numberOfEvents)}
						onChange={onChangeEventsNumber}
						min={1}
						max={6}
					/>
				</PanelBody>
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