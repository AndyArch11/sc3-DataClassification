import React, { useState } from 'react';
import "./DC.css";

const DCReport = ({ entries = [] }) => {
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: '' });

    const handleMouseEnter = (event, content) => {
        setTooltip({
            visible: true,
            x: event.clientX,
            y: event.clientY - 10,
            content
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ visible: false, x: 0, y: 0, content: '' });
    };

    const handleMouseMove = (event) => {
        if (tooltip.visible) {
            setTooltip(prev => ({
                ...prev,
                x: event.clientX,
                y: event.clientY - 10
            }));
        }
    };    

    if (entries.length === 0) {
        return null;
    }

    if (entries.length === 0) {
        return (
            <div className="dc-report-container">
                <h3>📊 Data Classification Summary</h3>
                <p>No entries to report. Submit some data classifications to see the summary.</p>
            </div>
        );
    }

    const classificationCounts = entries.reduce((counts, entry) => {
        const classification = entry.dataClassification || 'Unknown';
        counts[classification] = (counts[classification] || 0) + 1;
        return counts;
    }, {});

    const sensitivityCounts = entries.reduce((counts, entry) => {
        const sensitivity = entry.dataSensitivity || 'Unknown';
        counts[sensitivity] = (counts[sensitivity] || 0) + 1;
        return counts;
    }, {});

    const criticalityCounts = entries.reduce((counts, entry) => {
        const criticality = entry.dataCriticality || 'Unknown';
        counts[criticality] = (counts[criticality] || 0) + 1;
        return counts;
    }, {});

    const assetTypeCounts = entries.reduce((counts, entry) => {
        const assetType = entry.assetType || 'Unknown';
        counts[assetType] = (counts[assetType] || 0) + 1;
        return counts;
    }, {});

    const dataTypeCounts = entries.reduce((counts, entry) => {
        const dataType = entry.dataType || 'Unknown';
        counts[dataType] = (counts[dataType] || 0) + 1;
        return counts;
    }, {});

    const uniqueAssetTypes = Object.keys(assetTypeCounts).length;
    const uniqueDataTypes = Object.keys(dataTypeCounts).length;

    // Calculate asset type percentages and details
    const assetTypeBreakdown = Object.entries(assetTypeCounts).map(([assetType, count]) => ({
        assetType,
        count,
        percentage: (count / entries.length) * 100
    }));

    // Calculate data type percentages and details
    const dataTypeBreakdown = Object.entries(dataTypeCounts).map(([dataType, count]) => ({
        dataType,
        count,
        percentage: (count / entries.length) * 100
    }));

    // Calculate percentages for donut chart
    const classificationPercentages = Object.entries(classificationCounts).map(([classification, count]) => ({
        classification,
        count,
        percentage: (count / entries.length) * 100
    }));

    const sensitivityPercentages = Object.entries(sensitivityCounts).map(([sensitivity, count]) => ({
        sensitivity,
        count,
        percentage: (count / entries.length) * 100
    }));

    const criticalityPercentages = Object.entries(criticalityCounts).map(([criticality, count]) => ({
        criticality,
        count,
        percentage: (count / entries.length) * 100
    }));

    // Create donut chart segments
    let cumulativePercentage = 0;
    const donutSegments = classificationPercentages.map(({ classification, count, percentage }) => {
        const startAngle = cumulativePercentage * 3.6; // Convert percentage to degrees
        const endAngle = (cumulativePercentage + percentage) * 3.6;
        cumulativePercentage += percentage;
        
        return {
            classification,
            count,
            percentage,
            startAngle,
            endAngle,
            color: classification.toLowerCase() === 'public' ? '#388e3c' :
                   classification.toLowerCase() === 'internal' ? '#0099cc' :
                   classification.toLowerCase() === 'confidential' ? '#fbc02d' :
                   classification.toLowerCase() === 'restricted' ? '#7b1fa2' : '#ccc'
        };
    });

    // Create sensitivity donut segments
    let sensitivityCumulative = 0;
    const sensitivitySegments = sensitivityPercentages.map(({ sensitivity, count, percentage }) => {
        const startAngle = sensitivityCumulative * 3.6;
        const endAngle = (sensitivityCumulative + percentage) * 3.6;
        sensitivityCumulative += percentage;
        
        return {
            sensitivity,
            count,
            percentage,
            startAngle,
            endAngle,
            color: sensitivity.toLowerCase() === 'public' ? '#388e3c' :
                   sensitivity.toLowerCase() === 'internal' ? '#0099cc' :
                   sensitivity.toLowerCase() === 'confidential' ? '#fbc02d' :
                   sensitivity.toLowerCase() === 'restricted' ? '#7b1fa2' : '#ccc'
        };
    });

    // Create criticality donut segments
    let criticalityCumulative = 0;
    const criticalitySegments = criticalityPercentages.map(({ criticality, count, percentage }) => {
        const startAngle = criticalityCumulative * 3.6;
        const endAngle = (criticalityCumulative + percentage) * 3.6;
        criticalityCumulative += percentage;
        
        return {
            criticality,
            count,
            percentage,
            startAngle,
            endAngle,
            color: criticality.toLowerCase() === 'public' ? '#388e3c' :
                   criticality.toLowerCase() === 'internal' ? '#0099cc' :
                   criticality.toLowerCase() === 'confidential' ? '#fbc02d' :
                   criticality.toLowerCase() === 'restricted' ? '#7b1fa2' : '#ccc'
        };
    });

    return (
        <div className="dc-report-container">
            <details className="dc-report-details">
                <summary className="dc-report-summary">
                📊 Data Classification Summary
                </summary>
                <div>
                    <h3 className="dc-report-title">Data Classification Summary</h3>

                    <div className="dc-classification-breakdown">
                        <h4>📋 Classification Breakdown</h4>
                        <div className="dc-donut-container">
                            <div className="dc-donut-chart">
                                <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="80"
                                        fill="none"
                                        stroke="#f0f0f0"
                                        strokeWidth="40"
                                    />
                                    {classificationPercentages.length === 1 ? (
                                        // Single classification - show full circle
                                        <circle
                                            cx="100"
                                            cy="100"
                                            r="80"
                                            fill="none"
                                            stroke={donutSegments[0].color}
                                            strokeWidth="40"
                                            style={{ cursor: 'pointer' }}
                                            onMouseEnter={(e) => handleMouseEnter(e, `${donutSegments[0].classification}: ${donutSegments[0].count} asset${donutSegments[0].count !== 1 ? 's' : ''} (100%)`)}
                                            onMouseLeave={handleMouseLeave}
                                            onMouseMove={handleMouseMove}
                                        />
                                    ) : (
                                        // Multiple classifications - show arcs
                                        donutSegments.map(({ classification, percentage, color, count }, index) => {
                                            const radius = 80;
                                            const circumference = 2 * Math.PI * radius;
                                            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                                            const strokeDashoffset = -((donutSegments.slice(0, index).reduce((sum, seg) => sum + seg.percentage, 0) / 100) * circumference);
                                            
                                            return (
                                                <circle
                                                    key={classification}
                                                    cx="100"
                                                    cy="100"
                                                    r={radius}
                                                    fill="none"
                                                    stroke={color}
                                                    strokeWidth="40"
                                                    strokeDasharray={strokeDasharray}
                                                    strokeDashoffset={strokeDashoffset}
                                                    transform="rotate(-90 100 100)"
                                                    style={{ cursor: 'pointer' }}
                                                    onMouseEnter={(e) => handleMouseEnter(e, `${classification}: ${count} asset${count !== 1 ? 's' : ''} (${Math.round(percentage)}%)`)}
                                                    onMouseLeave={handleMouseLeave}
                                                    onMouseMove={handleMouseMove}
                                                />
                                            );
                                        })
                                    )}
                                </svg>
                                <div className="dc-donut-center">
                                    <div className="dc-donut-total">{entries.length}</div>
                                    <div className="dc-donut-label">Assets</div>
                                </div>
                            </div>
                            <div className="dc-donut-legend">
                                {classificationPercentages.map(({ classification, count, percentage }) => (
                                    <div key={classification} className="dc-legend-item">
                                        <span className={`dc-legend-color dc-${classification.toLowerCase()}`}></span>
                                        <span className="dc-legend-text">
                                            {classification === 'Public' && '🌐'}
                                            {classification === 'Internal' && '🏢'}
                                            {classification === 'Confidential' && '🔒'}
                                            {classification === 'Restricted' && '🚫'}
                                            {' '}{classification}: {count} ({Math.round(percentage)}%)
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="dc-classification-breakdown">
                        <h4>🔐 Sensitivity Breakdown (Confidentiality Impact)</h4>
                        <div className="dc-donut-container">
                            <div className="dc-donut-chart">
                                <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="80"
                                        fill="none"
                                        stroke="#f0f0f0"
                                        strokeWidth="40"
                                    />
                                    {sensitivityPercentages.length === 1 ? (
                                        <circle
                                            cx="100"
                                            cy="100"
                                            r="80"
                                            fill="none"
                                            stroke={sensitivitySegments[0].color}
                                            strokeWidth="40"
                                            style={{ cursor: 'pointer' }}
                                            onMouseEnter={(e) => handleMouseEnter(e, `${sensitivitySegments[0].sensitivity}: ${sensitivitySegments[0].count} asset${sensitivitySegments[0].count !== 1 ? 's' : ''} (100%)`)}
                                            onMouseLeave={handleMouseLeave}
                                            onMouseMove={handleMouseMove}
                                        />
                                    ) : (
                                        sensitivitySegments.map(({ sensitivity, percentage, color, count }, index) => {
                                            const radius = 80;
                                            const circumference = 2 * Math.PI * radius;
                                            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                                            const strokeDashoffset = -((sensitivitySegments.slice(0, index).reduce((sum, seg) => sum + seg.percentage, 0) / 100) * circumference);
                                            
                                            return (
                                                <circle
                                                    key={sensitivity}
                                                    cx="100"
                                                    cy="100"
                                                    r={radius}
                                                    fill="none"
                                                    stroke={color}
                                                    strokeWidth="40"
                                                    strokeDasharray={strokeDasharray}
                                                    strokeDashoffset={strokeDashoffset}
                                                    transform="rotate(-90 100 100)"
                                                    style={{ cursor: 'pointer' }}
                                                    onMouseEnter={(e) => handleMouseEnter(e, `${sensitivity}: ${count} asset${count !== 1 ? 's' : ''} (${Math.round(percentage)}%)`)}
                                                    onMouseLeave={handleMouseLeave}
                                                    onMouseMove={handleMouseMove}
                                                />
                                            );
                                        })
                                    )}
                                </svg>
                                <div className="dc-donut-center">
                                    <div className="dc-donut-total">{entries.length}</div>
                                    <div className="dc-donut-label">Assets</div>
                                </div>
                            </div>
                            <div className="dc-donut-legend">
                                {sensitivityPercentages.map(({ sensitivity, count, percentage }) => (
                                    <div key={sensitivity} className="dc-legend-item">
                                        <span className={`dc-legend-color dc-${sensitivity.toLowerCase()}`}></span>
                                        <span className="dc-legend-text">
                                            {sensitivity === 'Public' && '🌐'}
                                            {sensitivity === 'Internal' && '🏢'}
                                            {sensitivity === 'Confidential' && '🔒'}
                                            {sensitivity === 'Restricted' && '🚫'}
                                            {' '}{sensitivity}: {count} ({Math.round(percentage)}%)
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="dc-classification-breakdown">
                        <h4>⚡ Criticality Breakdown (Integrity & Availability Impact)</h4>
                        <div className="dc-donut-container">
                            <div className="dc-donut-chart">
                                <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet">
                                    <circle
                                        cx="100"
                                        cy="100"
                                        r="80"
                                        fill="none"
                                        stroke="#f0f0f0"
                                        strokeWidth="40"
                                    />
                                    {criticalityPercentages.length === 1 ? (
                                        <circle
                                            cx="100"
                                            cy="100"
                                            r="80"
                                            fill="none"
                                            stroke={criticalitySegments[0].color}
                                            strokeWidth="40"
                                            style={{ cursor: 'pointer' }}
                                            onMouseEnter={(e) => handleMouseEnter(e, `${criticalitySegments[0].criticality}: ${criticalitySegments[0].count} asset${criticalitySegments[0].count !== 1 ? 's' : ''} (100%)`)}
                                            onMouseLeave={handleMouseLeave}
                                            onMouseMove={handleMouseMove}
                                        />
                                    ) : (
                                        criticalitySegments.map(({ criticality, percentage, color, count }, index) => {
                                            const radius = 80;
                                            const circumference = 2 * Math.PI * radius;
                                            const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                                            const strokeDashoffset = -((criticalitySegments.slice(0, index).reduce((sum, seg) => sum + seg.percentage, 0) / 100) * circumference);
                                            
                                            return (
                                                <circle
                                                    key={criticality}
                                                    cx="100"
                                                    cy="100"
                                                    r={radius}
                                                    fill="none"
                                                    stroke={color}
                                                    strokeWidth="40"
                                                    strokeDasharray={strokeDasharray}
                                                    strokeDashoffset={strokeDashoffset}
                                                    transform="rotate(-90 100 100)"
                                                    style={{ cursor: 'pointer' }}
                                                    onMouseEnter={(e) => handleMouseEnter(e, `${criticality}: ${count} asset${count !== 1 ? 's' : ''} (${Math.round(percentage)}%)`)}
                                                    onMouseLeave={handleMouseLeave}
                                                    onMouseMove={handleMouseMove}
                                                />
                                            );
                                        })
                                    )}
                                </svg>
                                <div className="dc-donut-center">
                                    <div className="dc-donut-total">{entries.length}</div>
                                    <div className="dc-donut-label">Assets</div>
                                </div>
                            </div>
                            <div className="dc-donut-legend">
                                {criticalityPercentages.map(({ criticality, count, percentage }) => (
                                    <div key={criticality} className="dc-legend-item">
                                        <span className={`dc-legend-color dc-${criticality.toLowerCase()}`}></span>
                                        <span className="dc-legend-text">
                                            {criticality === 'Public' && '🌐'}
                                            {criticality === 'Internal' && '🏢'}
                                            {criticality === 'Confidential' && '🔒'}
                                            {criticality === 'Restricted' && '🚫'}
                                            {' '}{criticality}: {count} ({Math.round(percentage)}%)
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    
                    <div className="dc-report-stats">
                        <div className="dc-stat-card">
                            <h4>📈 Total Assets</h4>
                            <div className="dc-stat-number">{entries.length}</div>
                        </div>
                        
                        <div className="dc-stat-card">
                            <h4>🏗️ Asset Types</h4>
                            <div className="dc-stat-number">{uniqueAssetTypes}</div>
                        </div>
                        
                        <div className="dc-stat-card">
                            <h4>📊 Data Types</h4>
                            <div className="dc-stat-number">{uniqueDataTypes}</div>
                        </div>
                    </div>

                    <div className="dc-asset-type-breakdown">
                        <h4>🏗️ Asset Type Breakdown</h4>
                        <div className="dc-asset-type-list">
                            {assetTypeBreakdown.map(({ assetType, count, percentage }) => (
                                <div key={assetType} className="dc-asset-type-item">
                                    <span className="dc-asset-type-icon">
                                        {assetType === 'printed-media' && '📄'}
                                        {assetType === 'digital-files' && '💾'}
                                        {assetType === 'database-data' && '🗄️'}
                                        {assetType === 'systems-applications' && '🖥️'}
                                        {assetType === 'emails' && '📧'}
                                        {assetType === 'cloud-storage' && '☁️'}
                                        {assetType === 'mobile-devices' && '📱'}
                                        {!['printed-media', 'digital-files', 'database-data', 'systems-applications', 'emails', 'cloud-storage', 'mobile-devices'].includes(assetType) && '📦'}
                                    </span>
                                    <span className="dc-asset-type-label">
                                        {assetType === 'printed-media' ? 'Printed Media' :
                                        assetType === 'digital-files' ? 'Digital Files' :
                                        assetType === 'database-data' ? 'Database Data' :
                                        assetType === 'systems-applications' ? 'Systems/Applications' :
                                        assetType === 'emails' ? 'Emails' :
                                        assetType === 'cloud-storage' ? 'Cloud Storage' :
                                        assetType === 'mobile-devices' ? 'Mobile Devices' :
                                        assetType.charAt(0).toUpperCase() + assetType.slice(1).replace(/-/g, ' ')}
                                    </span>
                                    <span className="dc-asset-type-count">{count}</span>
                                    <span className="dc-asset-type-percentage">
                                        ({Math.round(percentage)}%)
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="dc-data-type-breakdown">
                        <h4>📊 Data Type Breakdown</h4>
                        <div className="dc-data-type-list">
                            {dataTypeBreakdown.map(({ dataType, count, percentage }) => (
                                <div key={dataType} className="dc-data-type-item">
                                    <span className="dc-data-type-icon">
                                        {dataType === 'pii' && '👤'}
                                        {dataType === 'financial' && '💰'}
                                        {dataType === 'ip' && '🧠'}
                                        {dataType === 'healthcare' && '🏥'}
                                        {dataType === 'customer' && '👥'}
                                        {dataType === 'employee' && '👷'}
                                        {dataType === 'operational' && '⚙️'}
                                        {dataType === 'technical' && '🔧'}
                                        {dataType === 'strategic' && '📈'}
                                        {dataType === 'regulatory' && '⚖️'}
                                        {dataType === 'research' && '🔬'}
                                        {dataType === 'legal' && '📜'}
                                        {dataType === 'marketing' && '📢'}
                                        {dataType === 'public-info' && '📰'}
                                        {dataType === 'mixed' && '🔄'}
                                        {dataType === 'other' && '📋'}
                                        {!['pii', 'financial', 'ip', 'healthcare', 'customer', 'employee', 'operational', 'technical', 'strategic', 'regulatory', 'research', 'legal', 'marketing', 'public-info', 'mixed', 'other'].includes(dataType) && '📄'}
                                    </span>
                                    <span className="dc-data-type-label">
                                        {dataType === 'pii' ? 'Personal Identifiable Information (PII)' :
                                        dataType === 'financial' ? 'Financial Data' :
                                        dataType === 'ip' ? 'Intellectual Property (IP)' :
                                        dataType === 'healthcare' ? 'Healthcare/Medical Data' :
                                        dataType === 'customer' ? 'Customer Data' :
                                        dataType === 'employee' ? 'Employee Data' :
                                        dataType === 'operational' ? 'Operational Data' :
                                        dataType === 'technical' ? 'Technical Data' :
                                        dataType === 'strategic' ? 'Strategic/Business Data' :
                                        dataType === 'regulatory' ? 'Regulatory/Compliance Data' :
                                        dataType === 'research' ? 'Research & Development' :
                                        dataType === 'legal' ? 'Legal Documents' :
                                        dataType === 'marketing' ? 'Marketing Data' :
                                        dataType === 'public-info' ? 'Public Information' :
                                        dataType === 'mixed' ? 'Mixed Data Types' :
                                        dataType === 'other' ? 'Other' :
                                        dataType.charAt(0).toUpperCase() + dataType.slice(1).replace(/-/g, ' ')}
                                    </span>
                                    <span className="dc-data-type-count">{count}</span>
                                    <span className="dc-data-type-percentage">
                                        ({Math.round(percentage)}%)
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Custom Tooltip */}
                    {tooltip.visible && (
                        <div 
                            className="dc-tooltip"
                            style={{
                                position: 'fixed',
                                left: tooltip.x + 10,
                                top: tooltip.y,
                                zIndex: 1000,
                                pointerEvents: 'none'
                            }}
                        >
                            {tooltip.content}
                        </div>
                    )}
                </div>
            </details>
        </div>
    );
};

export default DCReport;
