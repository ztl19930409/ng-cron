import React from 'react';
import { Segment, CoreService, Mode, CronJobsSelectOption } from '@sbzen/cron-core';

import { TabSingleSegmentComponent } from './../tab-single-segment.abstract';
import { TabBaseProps, TabBaseState } from './../tab-base.abstract';

type ReCronSecondState = {
	secondCodes: CronJobsSelectOption[];
	secondsList: CronJobsSelectOption[];
} & TabBaseState<Segment.seconds>;

export class ReCronSecond extends TabSingleSegmentComponent<ReCronSecondState, Segment.seconds> {
	constructor(props: TabBaseProps) {
		super(props, Segment.seconds);

		const coreService = new CoreService();
		this.state = {
			secondCodes: coreService.getList(Segment.seconds, true),
			secondsList: coreService.getList(Segment.seconds),
			seconds: this.getView(Segment.seconds)
		};
	}

	protected genEvery() {
		return (
			<div className={this.genClassName(['form-group'], ['c-every'])}>
				<div className={this.genClassName(['form-check'], ['c-every-check'])}>
					<input
						className={this.genClassName(['form-check-input'], ['c-every-option'])}
						type="radio"
						id={this.genId(Mode.EVERY)}
						value={Mode.EVERY}
						checked={this.state.seconds.selected === Mode.EVERY}
						disabled={this.isDisabled()}
						onChange={() => {this.setEvery()}} />

					<label
						className={this.genClassName(['form-check-label'], ['c-every-option-label'])}
						htmlFor={this.genId(Mode.EVERY)}>
						Every second
					</label>
				</div>
			</div>
		);
	}

	protected genIncrement() {
		return (
			<div className={this.genClassName(['form-group', 'form-inline'], ['c-increment'])}>
				<div className={this.genClassName(['form-check'], ['c-increment-check'])}>
				
					<input
						className={this.genClassName(['form-check-input'], ['c-increment-option'])}
						type="radio"
						id={this.genId(Mode.INCREMENT)}
						value={Mode.INCREMENT}
						checked={this.state.seconds.selected === Mode.INCREMENT}
						disabled={this.isDisabled()}
						onChange={() => this.setSelected(Mode.INCREMENT)} />

					<label
						className={this.genClassName(['form-check-label'], ['c-increment-option-label'])}
						htmlFor={this.genId(Mode.INCREMENT)}>
						Every
					</label>
				</div>

				<select
					className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-increment-every'])}
					disabled={this.isDisabled(Mode.INCREMENT)}
					value={this.getValues(Mode.INCREMENT)[1]}
					onChange={(e) => this.setInValue(Mode.INCREMENT, 1, e.target.value)}>

					{this.state.secondCodes.map(item => {
						return (
							<option
								key={item.value}
								value={item.value}>
								{item.value}
							</option>
						);
					})}
				</select>

				<label
					className="c-increment-option-label2"
					htmlFor={this.genId(Mode.INCREMENT)}>
					second(s) starting at second
				</label>

				<select
					className={this.genClassName(['form-control', 'form-control-sm', 'ml-1'], ['c-increment-from'])}
					disabled={this.isDisabled(Mode.INCREMENT)}
					value={this.getValues(Mode.INCREMENT)[0]}
					onChange={(e) => this.setInValue(Mode.INCREMENT, 0, e.target.value)}>

					{this.state.secondsList.map(item => {
						return (
							<option
								key={item.value}
								value={item.value}>
								{item.label}
							</option>
						);
					})}
				</select>
			</div>
		);
	}

	protected genAnd() {
		return (
			<div className={this.genClassName(['form-group'], ['c-and'])}>
				<div className={this.genClassName(['form-check'], ['c-and-check'])}>
					<input
						className={this.genClassName(['form-check-input'], ['c-and-option'])}
						type="radio"
						id={this.genId(Mode.AND)}
						value={Mode.AND}
						checked={this.state.seconds.selected === Mode.AND}
						disabled={this.isDisabled()}
						onChange={() => this.setSelected(Mode.AND)} />

					<label
						className={this.genClassName(['form-check-label'], ['c-and-option-label'])}
						htmlFor={this.genId(Mode.AND)}>
						Specific second (choose one or many)
					</label>
				</div>

				<div className={this.genClassName(['row', 'pl-3', 'pt-1'], ['c-and-list'])}>
					{this.state.secondsList.map(item => {
						return (
							<div
								className={this.genClassName(['col-1'], ['c-and-item'])}
								item-value={item.value}
								key={this.genId(Mode.AND, item.value)}>

								<div className={this.genClassName(['form-check'], ['c-and-item-check'])}>
									<input
										className={this.genClassName(['form-check-input'], ['c-and-item-field'])}
										type="checkbox"
										id={this.genId(Mode.AND, item.value)}
										value={item.value}
										disabled={this.isDisabled(Mode.AND)}
										checked={this.inSpecificsList(item.value, Mode.AND)}
										onChange={() => this.toggleSpecifics(item.value, Mode.AND)} />

									<label
										className={this.genClassName(['form-check-label'], ['c-and-item-label'])}
										htmlFor={this.genId(Mode.AND, item.value)}>
										{item.label}
									</label>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	}

	protected genRange() {
		return (
			<div className={this.genClassName(['form-group', 'form-inline'], ['c-range'])}>
				<div className={this.genClassName(['form-check'], ['c-range-check'])}>
				
					<input
						className={this.genClassName(['form-check-input'], ['c-range-option'])}
						type="radio"
						id={this.genId(Mode.RANGE)}
						value={Mode.RANGE}
						checked={this.state.seconds.selected === Mode.RANGE}
						disabled={this.isDisabled()}
						onChange={() => this.setSelected(Mode.RANGE)}/>

					<label
						className={this.genClassName(['form-check-label'], ['c-range-option-label'])}
						htmlFor={this.genId(Mode.RANGE)}>
						Every second between second
					</label>
				</div>

				<select
					className={this.genClassName(['form-control', 'form-control-sm', 'mx-1'], ['c-range-from'])}
					disabled={this.isDisabled(Mode.RANGE)}
					value={this.getValues(Mode.RANGE)[0]}
					onChange={(e) => this.setInValue(Mode.RANGE, 0, e.target.value)}>

					{this.state.secondsList.map(item => {
						return (
							<option
								key={item.value}
								value={item.value}>
								{item.label}
							</option>
						);
					})}
				</select>

				<label
					className="c-range-option-label2"
					htmlFor={this.genId(Mode.RANGE)}>
					and second
				</label>

				<select
					className={this.genClassName(['form-control', 'form-control-sm', 'ml-1'], ['c-range-to'])}
					disabled={this.isDisabled(Mode.RANGE)}
					value={this.getValues(Mode.RANGE)[1]}
					onChange={(e) => this.setInValue(Mode.RANGE, 1, e.target.value)}>

					{this.state.secondsList.map(item => {
						return (
							<option
								key={item.value}
								value={item.value}>
								{item.label}
							</option>
						);
					})}
				</select>
			</div>
		);
	}
}
