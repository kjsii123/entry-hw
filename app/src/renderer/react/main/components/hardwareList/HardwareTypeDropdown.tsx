import React, { useState } from 'react';
import Styled from 'styled-components';
import { IMapDispatchToProps, IMapStateToProps } from '../../store';
import { changeHardwareCategory } from '../../store/modules/hardware';
import { connect } from 'react-redux';
import { CategoryTypeEnum } from '../../constants/constants';
import ArrowUpImage from '../../../../images/arrow_up.png';
import ArrowDownImage from '../../../../images/arrow_down.png';

const DropdownContainer = Styled.ul`
    float: right;
    margin-right: 20px;
    margin-top: -15px;
    padding: 0;
    border: 1px #4c94f8 solid;
`;

const DropdownContent = Styled.li`
    width: 138px;
    height: 30px;
    list-style-type: none;
    cursor: pointer;
    background-color: white;
    padding-left: 12px;
    
    &.init {
        border-bottom: 1px #4c94f8 solid;
        &.open {
            .arrow {
                background-image: url(${ArrowUpImage});
            }
        }
        .arrow {
            width: 30px;
            height: 30px;
            float: right;
            margin: -1px;
            border-left: 1px #4c94f8 solid;
            background-image: url(${ArrowDownImage});
            background-repeat: no-repeat;
            background-position: center;
        }
    }
    :not(.init) {
        &:hover,
        &.selected {
            background: white;        
        }
    }
`;

const ContentSpan = Styled.span`
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    color: #4c94f8;
    line-height: 28px;
    cursor: inherit;
`;

const HardwareCategoryEntries: { [key in keyof typeof CategoryTypeEnum]: string } = {
    [CategoryTypeEnum.all]: '전체',
    [CategoryTypeEnum.robot]: '로봇형',
    [CategoryTypeEnum.module]: '모듈형',
    [CategoryTypeEnum.board]: '보드형',
};

const HardwareTypeDropdown: React.FC<IStateProps & IDispatchProps> = (props) => {
    const [isShowList, setShowState] = useState(false);
    const [currentKey, currentValue] = Object
        .entries(HardwareCategoryEntries)
        .find(([keyword]) => props.hardwareFilterCategory === keyword)
    || [CategoryTypeEnum.all, HardwareCategoryEntries[CategoryTypeEnum.all]];

    return (
        <DropdownContainer id="filter_category" className="dropdown">
            <DropdownContent
                data-value={currentKey}
                className={`init ${isShowList && 'open'}`}
                onClick={() => setShowState(!isShowList)}
            >
                <ContentSpan>{currentValue}</ContentSpan>
                <div className="arrow"/>
            </DropdownContent>
            {isShowList && Object.entries(HardwareCategoryEntries).map(([keyword, value]) => (
                    <DropdownContent
                        key={keyword}
                        onClick={() => {
                            props.changeCategory(keyword as CategoryTypeEnum);
                            setShowState(!isShowList);
                        }}
                    >
                        <ContentSpan>{value}</ContentSpan>
                    </DropdownContent>
                ))}
        </DropdownContainer>
    );
};

interface IStateProps {
    hardwareFilterCategory: string;
}

const mapStateToProps: IMapStateToProps<IStateProps> = (state) => ({
    hardwareFilterCategory: state.hardware.hardwareFilterCategory,
});

interface IDispatchProps {
    changeCategory: (category: CategoryTypeEnum) => void;
}

const mapDispatchToProps: IMapDispatchToProps<IDispatchProps> = (dispatch) => ({
    changeCategory: changeHardwareCategory(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HardwareTypeDropdown);
