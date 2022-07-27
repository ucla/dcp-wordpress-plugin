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

	let eventHtml = (title, link, image, date, time, location, description) => {
		const d = new Date(`${date} ${time}:00`);
		
		let month = d.toLocaleDateString('en-US', {month: 'short'});
		let day = d.toLocaleDateString('en-US', {weekday: 'short'});
		let dayNum = d.getDate();
		let formatTime = d.toLocaleTimeString([], {hour: 'numeric' ,minute: '2-digit', hour12: true});
		return <article className="event-card">
				<a className="event-card__link" href={`${link}`}>
					<img className="event-card__image" src={`${image ? image : ''}`} alt="Two children on their phones under the blankets" />
					<h1 className="event-card__title"><span>{`${title}`}</span></h1>
				</a>
				<div className="event-card-info">
					<div className="event-card-info__date">
						<span className="small-block">
							<span className="event-card-info__day">{`${day}`}</span>
							<span className="event-card-info__month">{`${month}`}</span>
						</span>
						<span className="event-card-info__number">{`${dayNum}`}</span>
					</div>
					<div className="event-card-info__time">
					<object className="event-card-icon__time" tabindex="-1" data="/icons/denotive/time--grey60.svg" type="image/svg+xml">
						<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{enableBackground:'new 0 0 24 24'}} xmlnsXlink="http://www.w3.org/1999/xlink">
							<title>time</title>
							<g>
									<path fill="#666666" className="time--grey" d="M12,2c5.5,0,10,4.5,10,10s-4.5,10-10,10C6.5,22,2,17.5,2,12S6.5,2,12,2z M12,4
											c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S16.4,4,12,4z M12.5,7v5.2l4.5,2.7l-0.8,1.2L11,13V7H12.5z" />
							</g>
						</svg>
						</object>
						{`${formatTime}`}
					</div>
					<div className="event-card-info__location">
					<object className="event-card-icon__location" tabindex="-1" type="image/svg">
						<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" x="0" y="0" style={{enableBackground:'new 0 0 8 13'}} xmlnsXlink="http://www.w3.org/1999/xlink">
							<g id="Homepage">
								<g id="covid-homepage-mobile-1" transform="translate(-28.000000, -1806.000000)">
									<g id="Updates" transform="translate(0.000000, 586.000000)">
										<g id="Upcoming-Townhalls" transform="translate(24.000000, 1053.000000)">
											<g id="Minifeed" transform="translate(0.000000, 45.000000)">
												<g id="Date-Time-Location" transform="translate(0.000000, 82.000000)">
													<g id="Location-_x28_optional_x29_" transform="translate(0.000000, 36.000000)">
														<g id="Location-Icon-_x28_required_x29_" transform="translate(4.000000, 4.000000)">
															<path id="Shape" fill="#666666" d="M4,0.7c-2.2,0-4,1.8-4,4c0,3,4,7.4,4,7.4s4-4.4,4-7.4C8,2.5,6.2,0.7,4,0.7z M4,6.1
																c-0.8,0-1.4-0.6-1.4-1.4S3.2,3.2,4,3.2s1.4,0.6,1.4,1.4S4.8,6.1,4,6.1z"/>
														</g>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</g>
						</svg>
						</object>
						{`${location}`}
					</div>
					<div className="event-card-info__description">{`${description}`}</div>
				</div>
			</article>;
	};

	const renderSwitch = param => {
		switch (param) {
			case 'upcoming':
				
				return events.filter(convention => compareEventDateWithToday(convention.event_start_date.rendered) === false).sort((a,b) => new Date(b.event_start_date.rendered) - new Date(a.event_start_date.rendered)).map(convention => eventHtml(convention.title.raw, convention.link, convention?._embedded['wp:featuredmedia'][0]?.source_url, convention.event_start_date.rendered, convention.event_time.rendered, convention.event_location.rendered,convention.excerpt.raw))
				
				break;
			case 'past':
				
				return events.filter(convention => compareEventDateWithToday(convention.event_start_date.rendered) === true).sort((a,b) => new Date(b.event_start_date.rendered) - new Date(a.event_start_date.rendered)).map(convention => eventHtml(convention.title.raw, convention.link, convention?._embedded['wp:featuredmedia'][0]?.source_url, convention.event_start_date.rendered, convention.event_time.rendered, convention.event_location.rendered,convention.excerpt.raw))
				
				break;
			default:
				
				return events.sort((a,b) => new Date(b.event_start_date.rendered) - new Date(a.event_start_date.rendered)).map(convention => eventHtml(convention.title.raw, convention.link, convention?._embedded['wp:featuredmedia'][0]?.source_url, convention.event_start_date.rendered, convention.event_time.rendered, convention.event_location.rendered,convention.excerpt.raw))
				
				break;
		}
	}

	// if (events) {
	// 	events.map(convention => {
	// 		console.log(compareEventDateWithToday(convention.event_start_date.rendered))
	// 	})
	// }
    console.log('events', events)
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